
## Tinybird

### Overview
This project implements a March Madness meter that tracks live basketball games and calculates a "madness score" based on upsets and score differences. The madness score ranges from 0-100, with higher scores indicating more surprising outcomes (like when lower seeds are beating higher seeds by significant margins).

### Data Sources

#### basketball_game_events
Stores live basketball game events including scores, team information, and ratings. Each event captures a snapshot of the game state at a specific timestamp.

Example ingestion:
```bash
curl -X POST "https://api.europe-west2.gcp.tinybird.co/v0/events?name=basketball_game_events" \
    -H "Authorization: Bearer $TB_ADMIN_TOKEN" \
    -d '{
        "timestamp": "2024-03-21 15:30:00",
        "game_id": "2024_R64_1",
        "team1_name": "Duke",
        "team2_name": "Vermont",
        "team1_seed": 4,
        "team2_seed": 13,
        "team1_kenpom": 89.5,
        "team2_kenpom": 78.2,
        "team1_score": 65,
        "team2_score": 70
    }'
```

### Endpoints

#### current_madness_meter
Calculates the current overall madness level across all active games. The madness score for each game is based on seed differences and score margins, with higher scores indicating more surprising outcomes. The endpoint returns an average madness score across all games.

Example usage:
```bash
curl -X GET "https://api.europe-west2.gcp.tinybird.co/v0/pipes/current_madness_meter.json?token=$TB_ADMIN_TOKEN"
```

Example response:
```json
{
    "data": [
        {
            "overall_madness": 45.67
        }
    ]
}
```

#### madness_over_time
Tracks the madness level over time by aggregating data per minute since the tournament start (March 19th, 2024 at 11:00 AM). Shows the evolution of madness scores and the number of active games throughout the tournament.

Example usage:
```bash
curl -X GET "https://api.europe-west2.gcp.tinybird.co/v0/pipes/madness_over_time.json?token=$TB_ADMIN_TOKEN"
```

Example response:
```json
{
    "data": [
        {
            "minute": "2024-03-19 11:00:00",
            "madness_level": 25.50,
            "active_games": 2
        },
        {
            "minute": "2024-03-19 11:01:00",
            "madness_level": 32.75,
            "active_games": 3
        }
    ]
}
```
