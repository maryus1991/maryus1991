from pathlib import Path

import requests

URL = (
    "https://streak-stats.demolab.com/"
    "?user=maryus1991"
    "&hide_border=true"
    "&background=0D1117"
    "&stroke=0D1117"
    "&ring=58A6FF"
    "&fire=58A6FF"
    "&currStreakLabel=58A6FF"
    "&sideLabels=C9D1D9"
    "&currStreakNum=E6EDF3"
    "&sideNums=E6EDF3"
    "&dates=8B949E"
    "&border_radius=6"
)

OUTPUT = Path("stats.svg")


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    headers = {
        "User-Agent": "Mozilla/5.0",
        "Accept": "image/svg+xml",
    }

    response = requests.get(URL, headers=headers, timeout=30)
    response.raise_for_status()

    if "image/svg+xml" not in response.headers.get("Content-Type", ""):
        raise RuntimeError(
            f"Expected SVG but got {response.headers.get('Content-Type')}"
        )

    OUTPUT.write_bytes(response.content)

    print(f"Saved: {OUTPUT.resolve()}")


if __name__ == "__main__":
    main()