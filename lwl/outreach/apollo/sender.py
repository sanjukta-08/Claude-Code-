"""Add Tier 2 contacts to Apollo sequence. Idempotent — skips already-sequenced."""
from __future__ import annotations

import os
from pathlib import Path

import typer

from enrichment.apollo_client import ApolloClient

app = typer.Typer(add_completion=False)


@app.command()
def add(person_id: str, sequence_id: str = "TIER2_AUTO"):
    user_id = os.environ["APOLLO_SEQUENCE_USER_ID"]
    res = ApolloClient().add_to_sequence(person_id, sequence_id, user_id)
    print(res)


@app.command("batch")
def batch(csv_path: Path, sequence_id: str = "TIER2_AUTO"):
    import csv
    user_id = os.environ["APOLLO_SEQUENCE_USER_ID"]
    client = ApolloClient()
    with csv_path.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            pid = row.get("apollo_person_id")
            if not pid:
                continue
            try:
                client.add_to_sequence(pid, sequence_id, user_id)
                print(f"  ✓ {row.get('contact_name')} → {sequence_id}")
            except Exception as e:
                print(f"  ✗ {row.get('contact_name')}: {e}")


if __name__ == "__main__":
    app()
