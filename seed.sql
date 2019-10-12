DROP DATABASE IF EXISTS hangman;
CREATE DATABASE hangman;

\c hangman;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    games_won INT,
    games_played INT,
    guesses_needed INT,
    level_won_games INT,
    level_played_games INT
);
