-- LWL Central Registry · Anjali · Supabase
-- Core rule: ONE school, ONE active programme at a time.
-- Cross-sell only unlocks at Day 30 / 60 / 90 post-payment.

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ─── Schools (the source of truth) ─────────────────────────
create table if not exists schools (
    id uuid primary key default uuid_generate_v4(),
    school_name text not null,
    domain text not null,
    country text,
    country_iso2 char(2),
    region text check (region in ('UAE','US','UK','IN','KR','SG','LATAM','EU','OTHER')),
    curriculum text,
    ib_status text check (ib_status in ('YES','NO','Candidate')),
    grades_served text,
    est_enrollment int,
    tuition_usd_per_year int,
    is_yale_camp_eligible boolean default false,
    apollo_org_id text,
    org_size int,
    owner text,
    lcs_score int check (lcs_score between 0 and 100),
    tier int check (tier in (1,2,3)),
    profile_json jsonb,
    enriched_at timestamptz default now(),
    last_rescored_at timestamptz default now(),
    unique (domain)
);

create index if not exists schools_tier_idx on schools(tier);
create index if not exists schools_region_idx on schools(region);
create index if not exists schools_score_idx on schools(lcs_score desc);

-- Hard-stop trigger: never let a non-US school be Yale-eligible
create or replace function enforce_yale_us_only()
returns trigger as $$
begin
    if new.is_yale_camp_eligible and (new.country_iso2 is null or new.country_iso2 <> 'US') then
        new.is_yale_camp_eligible := false;
    end if;
    return new;
end;
$$ language plpgsql;

drop trigger if exists trg_yale_us_only on schools;
create trigger trg_yale_us_only before insert or update on schools
    for each row execute function enforce_yale_us_only();

-- ─── Contacts ──────────────────────────────────────────────
create table if not exists contacts (
    id uuid primary key default uuid_generate_v4(),
    school_id uuid references schools(id) on delete cascade,
    name text,
    title text,
    email text,
    email_verified boolean default false,
    linkedin text,
    phone text,
    created_at timestamptz default now()
);

create index if not exists contacts_school_idx on contacts(school_id);
create unique index if not exists contacts_email_unique on contacts(email) where email is not null;

-- ─── Programme Locks (Anjali's core mechanic) ──────────────
-- One school, one ACTIVE programme. Cross-sell unlocks at d30/60/90.
create table if not exists programme_locks (
    id uuid primary key default uuid_generate_v4(),
    school_id uuid references schools(id) on delete cascade,
    contact_id uuid references contacts(id),
    programme text not null check (programme in ('FDSP','Edge','Research','Onward','Yale','Harvard')),
    status text not null default 'active' check (status in ('active','crosssell_open','complete','cancelled')),
    paid_amount_usd numeric(10,2),
    discount_code text,
    locked_at timestamptz default now(),
    crosssell_open_at timestamptz,
    completed_at timestamptz
);

-- Only one active lock per school. Period.
create unique index if not exists programme_locks_one_active
    on programme_locks(school_id) where status = 'active';

create index if not exists programme_locks_status_idx on programme_locks(status, locked_at);

-- ─── Outreach Log (audit trail) ────────────────────────────
create table if not exists outreach_events (
    id uuid primary key default uuid_generate_v4(),
    school_id uuid references schools(id) on delete cascade,
    contact_id uuid references contacts(id),
    channel text check (channel in ('apollo_email','whatsapp','tavus','manychat','bland','slack','brevo')),
    event_type text,
    payload jsonb,
    occurred_at timestamptz default now()
);

create index if not exists outreach_school_idx on outreach_events(school_id, occurred_at desc);

-- ─── Payments ──────────────────────────────────────────────
create table if not exists payments (
    id uuid primary key default uuid_generate_v4(),
    school_id uuid references schools(id),
    contact_id uuid references contacts(id),
    provider text check (provider in ('stripe','razorpay')),
    provider_event_id text unique,
    customer_email text,
    amount_usd numeric(10,2),
    currency text default 'USD',
    programme text,
    tier_purchased text check (tier_purchased in ('CORE','PUBLISH_PLUS','ELITE')),
    discount_code text,
    paid_at timestamptz default now()
);

create index if not exists payments_email_idx on payments(customer_email);
create index if not exists payments_paid_at_idx on payments(paid_at);

-- ─── Discount Codes (48hr urgency mechanic) ────────────────
create table if not exists discount_codes (
    code text primary key,
    programme text check (programme in ('FDSP','Edge','Research','Onward','Yale','Harvard')),
    tier text check (tier in ('CORE','PUBLISH_PLUS','ELITE')),
    discount_pct numeric(5,2),
    issued_to_email text,
    issued_at timestamptz default now(),
    expires_at timestamptz not null,
    redeemed_at timestamptz,
    payment_id uuid references payments(id)
);

create index if not exists discount_codes_email_idx on discount_codes(issued_to_email);
create index if not exists discount_codes_expiry_idx on discount_codes(expires_at) where redeemed_at is null;

-- ─── Masterclass Registrations ─────────────────────────────
create table if not exists masterclass_registrations (
    id uuid primary key default uuid_generate_v4(),
    school_id uuid references schools(id),
    contact_email text,
    contact_phone text,
    programme text,
    masterclass_date date,
    attended boolean default false,
    discount_code_issued text references discount_codes(code),
    registered_at timestamptz default now()
);

create index if not exists masterclass_email_idx on masterclass_registrations(contact_email);

-- ─── Copy Audit (weekly: only "Harvard student mentors" allowed) ─
create table if not exists copy_audit (
    id uuid primary key default uuid_generate_v4(),
    artifact_path text,
    snippet text,
    contains_violation boolean,
    reviewed_by text default 'anjali',
    reviewed_at timestamptz default now()
);

-- ─── View: schools due for cross-sell ──────────────────────
create or replace view v_crosssell_due as
select
    s.id as school_id,
    s.school_name,
    pl.programme,
    p.customer_email as email,
    p.amount_usd,
    extract(day from now() - p.paid_at)::int as days_since_payment,
    case
        when extract(day from now() - p.paid_at)::int = 30 then 'd30'
        when extract(day from now() - p.paid_at)::int = 60 then 'd60'
        when extract(day from now() - p.paid_at)::int = 90 then 'd90'
    end as milestone
from programme_locks pl
join schools s on s.id = pl.school_id
join payments p on p.school_id = s.id and p.programme = pl.programme
where pl.status in ('active','crosssell_open')
  and extract(day from now() - p.paid_at)::int in (30,60,90);

-- ─── RLS (Supabase) ────────────────────────────────────────
alter table schools enable row level security;
alter table contacts enable row level security;
alter table programme_locks enable row level security;
alter table payments enable row level security;
alter table discount_codes enable row level security;
alter table masterclass_registrations enable row level security;
alter table outreach_events enable row level security;

-- Service role bypasses RLS. App users get read via team_member policy below.
create policy "service_role_all" on schools for all using (auth.role() = 'service_role');
create policy "service_role_all" on contacts for all using (auth.role() = 'service_role');
create policy "service_role_all" on programme_locks for all using (auth.role() = 'service_role');
create policy "service_role_all" on payments for all using (auth.role() = 'service_role');
create policy "service_role_all" on discount_codes for all using (auth.role() = 'service_role');
create policy "service_role_all" on masterclass_registrations for all using (auth.role() = 'service_role');
create policy "service_role_all" on outreach_events for all using (auth.role() = 'service_role');
