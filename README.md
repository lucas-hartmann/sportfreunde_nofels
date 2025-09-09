# ⚽ Sportfreunde Nofels – Vereinswebsite

Willkommen im GitHub-Repository der offiziellen Website der **Sportfreunde Nofels** – einem leidenschaftlichen Hobby-Fußballverein aus Vorarlberg!  
Diese Seite stellt unseren Verein, unsere Mannschaften, Spielpläne, Bildergalerien und Events vor.

## 🔗 Live-Demo

👉 [Website ansehen](https://sportfreunde-nofels.netlify.app/)

---

## 📸 Features

- **🏟️ Vereinsvorstellung** – Geschichte, Werte und Vision
- **👥 Mannschaften** – Spielerlisten, Bilder, Positionen und Beitrittsjahre
- **📅 Spielplan & Tabelle** – Saisonübersicht und aktuelle Ergebnisse
- **🖼️ Bildergalerien** – Eindrücke von Turnieren, Matches & dem Vereinsleben
- **📚 Archiv** – Ergebnisse & Highlights der Saison
- **⚽ Hobbyliga** – Übersicht über die Liga, Teams & Spieltage
- **📱 Responsive Design** – Optimiert für Desktop, Tablet und Smartphone

---

## 🛠️ Tech Stack

- **Next.js** – React Framework für moderne Webentwicklung
- **Tailwind CSS** – Utility-first CSS Framework für schnelles Styling
- **TypeScript** – Typsicherheit für bessere Entwicklererfahrung
- **JSON-basierte Datenstruktur** – Inhalte werden dynamisch aus Dateien geladen


## API Documentation

This API provides match and matchday information for the 2025 season of the league. It can also be used to calculate league standings dynamically.

---

## Base URL

```
/api/matchdays
```

All endpoints return JSON.

---

## **Endpoint: Get all matchdays**

* **URL:** `/api/matchdays`
* **Method:** `GET`
* **Description:** Returns the full list of matchdays with their matches, including scores if available.

### **Response**

**Status:** 200 OK
**Content-Type:** `application/json`

**Example Response:**

```json
[
  {
    "id": 1,
    "name": "1. Spieltag",
    "matches": [
      {
        "home": "FC Fraxern",
        "away": "RW Rankweil",
        "day": "Montag",
        "date": "28.04.2025",
        "time": "19:00",
        "location": "Fraxern",
        "note": "DO Feiertag",
        "score": { "home": 3, "away": 2 }
      },
      {
        "home": "FC Weiler",
        "away": "SF Nofels",
        "day": "Mittwoch",
        "date": "30.04.2025",
        "time": "18:30",
        "location": "Weiler",
        "note": "DO Feiertag",
        "score": { "home": 0, "away": 7 }
      }
    ]
  }
]
```

---

## **Data Types**

### **Matchday**

| Field   | Type     | Description                                |
| ------- | -------- | ------------------------------------------ |
| id      | number   | Unique ID of the matchday                  |
| name    | string   | Name of the matchday (e.g., "1. Spieltag") |
| matches | Match\[] | Array of matches for this matchday         |

### **Match**

| Field    | Type                                   | Description                               |
| -------- | -------------------------------------- | ----------------------------------------- |
| home     | string                                 | Home team name                            |
| away     | string                                 | Away team name                            |
| day      | string                                 | Weekday of the match                      |
| date     | string                                 | Date of the match in `DD.MM.YYYY` format  |
| time     | string                                 | Match time in `HH:MM` format              |
| location | string                                 | Location / stadium                        |
| note     | string \| null                         | Optional note about the match             |
| score    | { home: number; away: number } \| null | Optional score (null if match not played) |

---

## **Calculating the League Table**

You can calculate a dynamic league table using the API data. For each team, you can calculate:

* **Games Played (Spiele):** Count of matches where `score` is not `null`.
* **Wins (S), Draws (U), Losses (N):**

  * Win: team scored more goals than opponent → 3 points
  * Draw: same goals → 1 point
  * Loss: fewer goals → 0 points
* **Goals Scored (Tore):** Sum of goals scored by the team.
* **Goals Conceded (Gegentore):** Sum of goals conceded by the team.
* **Goal Difference (Diff):** `Tore - Gegentore`
* **Points (Pkt):** `Wins * 3 + Draws * 1`

### **Example Calculation (TypeScript)**

```ts
import { matchdays, Match } from "@/data/spielplan2025";

type TeamStats = {
  club: string;
  spiele: number;
  gewonnen: number;
  unentschieden: number;
  verloren: number;
  tore: number;
  gegentore: number;
  diff: number;
  punkte: number;
};

function calculateLeagueTable(): TeamStats[] {
  const teams: Record<string, TeamStats> = {};

  // collect all matches
  matchdays.flatMap(m => m.matches).forEach((match: Match) => {
    if (!teams[match.home]) teams[match.home] = { club: match.home, spiele: 0, gewonnen: 0, unentschieden: 0, verloren: 0, tore: 0, gegentore: 0, diff: 0, punkte: 0 };
    if (!teams[match.away]) teams[match.away] = { club: match.away, spiele: 0, gewonnen: 0, unentschieden: 0, verloren: 0, tore: 0, gegentore: 0, diff: 0, punkte: 0 };

    if (match.score) {
      const home = teams[match.home];
      const away = teams[match.away];
      home.spiele++; away.spiele++;
      home.tore += match.score.home;
      home.gegentore += match.score.away;
      away.tore += match.score.away;
      away.gegentore += match.score.home;

      if (match.score.home > match.score.away) {
        home.gewonnen++; home.punkte += 3;
        away.verloren++;
      } else if (match.score.home < match.score.away) {
        away.gewonnen++; away.punkte += 3;
        home.verloren++;
      } else {
        home.unentschieden++; home.punkte += 1;
        away.unentschieden++; away.punkte += 1;
      }

      home.diff = home.tore - home.gegentore;
      away.diff = away.tore - away.gegentore;
    }
  });

  // sort by points, then goal difference
  return Object.values(teams).sort((a, b) => b.punkte - a.punkte || b.diff - a.diff);
}

// Example usage
console.log(calculateLeagueTable());
```

---

## Notes

1. Matches with `score = null` are considered unplayed and are ignored in table calculations.
2. The API can be used to generate match schedules, upcoming games, or calculate team-specific stats dynamically.
3. This setup is suitable for **React/Next.js projects** or any frontend consuming a JSON API.
