"""KHDA · COBIS · BSO — regional registries.

KHDA is mandatory for all Dubai schools and is the warmest market for Edge Club
because the UAE government enrichment mandate already requires it.
"""
from __future__ import annotations

import csv
import os
from pathlib import Path

import httpx
import typer

app = typer.Typer(add_completion=False)


@app.command()
def khda(out: Path = typer.Option(Path("data/raw/khda.csv"))):
    """KHDA: public Dubai schools directory. Browse AI robot dump expected here."""
    api = os.environ.get("BROWSE_AI_API_KEY")
    robot_id = "khda-dubai-schools"
    r = httpx.get(
        f"https://api.browse.ai/v2/robots/{robot_id}/tasks",
        headers={"Authorization": f"Bearer {api}"},
        timeout=60,
    )
    r.raise_for_status()
    tasks = r.json().get("result", {}).get("robotTasks", {}).get("items", [])
    if not tasks:
        print("No KHDA tasks yet — trigger a run in Browse AI first.")
        return
    rows = tasks[0].get("capturedLists", {}).get("schools", [])

    out.parent.mkdir(parents=True, exist_ok=True)
    with out.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["name", "curriculum", "fees", "rating", "phone", "url"])
        w.writeheader()
        for s in rows:
            w.writerow({k: s.get(k, "") for k in w.fieldnames})
    print(f"KHDA: {len(rows)} → {out}")


@app.command()
def cobis(out: Path = typer.Option(Path("data/raw/cobis.csv"))):
    """COBIS — Council of British International Schools."""
    r = httpx.get("https://www.cobis.org.uk/schools", timeout=30)
    r.raise_for_status()
    # Real parser would walk paginated school directory; placeholder header out
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text("name,country,url\n")
    print(f"COBIS: scaffold → {out} (wire BeautifulSoup parser per their HTML)")


if __name__ == "__main__":
    app()
