SELECT
    now() - toIntervalSecond(rand() % 172800) AS timestamp,
    concat('game_', toString(rand() % 1000)) AS game_id,
    concat('Team_', toString(rand() % 50)) AS team1_name,
    concat('Team_', toString(rand() % 50)) AS team2_name,
    1 + rand() % 16 AS team1_seed,
    1 + rand() % 16 AS team2_seed,
    round(80 + rand() % 40 + rand(), 2) AS team1_kenpom,
    round(80 + rand() % 40 + rand(), 2) AS team2_kenpom,
    60 + rand() % 40 AS team1_score,
    greatest(
        least(
            60 + rand() % 40,
            toUInt16(team1_score + 20)
        ),
        toUInt16(team1_score - 20)
    ) AS team2_score
FROM numbers(1000)