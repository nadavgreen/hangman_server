DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    games_won INT,
    games_played INT,
    guesses_needed INT,
    level_won_games INT,
    level_played_games INT,
    current_word VARCHAR
);
