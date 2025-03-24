
SELECT
    now() - toIntervalHour(rand() % 48) - toIntervalMinute(rand() % 60) AS timestamp,
    concat('game_', toString(rand() % 1000)) AS game_id,
    ['Duke', 'Kentucky', 'Kansas', 'North Carolina', 'Gonzaga', 'Michigan', 'Villanova', 'Virginia', 'Texas', 'Baylor', 'Arizona', 'UCLA', 'Houston', 'Indiana', 'Tennessee', 'Wisconsin'][(rand() % 16) + 1] AS team1_name,
    ['Oregon', 'Iowa', 'Providence', 'Miami', 'Arkansas', 'TCU', 'Michigan State', 'Auburn', 'Illinois', 'Colorado', 'Vermont', 'Colgate', 'Yale', 'Montana State', 'UNC Asheville', 'Texas Southern'][(rand() % 16) + 1] AS team2_name,
    1 + rand() % 8 AS team1_seed,
    9 + rand() % 8 AS team2_seed,
    round(65 + rand() % 25, 1) AS team1_kenpom,
    round(80 + rand() % 25, 1) AS team2_kenpom,
    CASE 
        WHEN (1 + rand() % 8) <= 3 THEN 65 + rand() % 20
        ELSE 55 + rand() % 15
    END AS team1_score,
    CASE 
        WHEN (9 + rand() % 8) >= 12 THEN 50 + rand() % 15
        ELSE 60 + rand() % 15
    END AS team2_score
FROM numbers(1000)
