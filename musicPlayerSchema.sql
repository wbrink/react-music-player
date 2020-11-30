CREATE DATABASE IF NOT EXISTS music_player;

use music_player;

-- MUSIC SPECIFIC TABLES

-- ARTISTS 
CREATE TABLE artists
(
	artist_id INT PRIMARY KEY AUTO_INCREMENT,
	artist_name VARCHAR NOT NULL
);

-- ALBUMS 
CREATE TABLE albums 
(
	album_id INT PRIMARY KEY AUTO_INCREMENT,
    album_name VARCHAR NOT NULL,
    genre_id INT,
    artist_id INT,
    release_date DATE NOT NULL
);


-- TRACKS 
CREATE TABLE tracks
(
	track_id INT PRIMARY KEY AUTO_INCREMENT,
    track_name VARCHAR NOT NULL,
    duration INT NOT NULL, -- in seconds
    track_number INT NOT NULL,
    album_id INT,
    genre_id INT,
    artist_id INT
);


-- GENRE 
CREATE TABLE genres
(
	genre_id INT PRIMARY KEY AUTO_INCREMENT,
    genre_name VARCHAR NOT NULL
);

-- Setting Up Foreign Keys for Music
ALTER TABLE albums
ADD FOREIGN KEY (genre_id) REFERENCES genres(genre_id);

ALTER TABLE albums
ADD FOREIGN KEY (artist_id) REFERENCES artists(artist_id) ON DELETE CASCADE;

ALTER TABLE tracks
ADD FOREIGN KEY (artist_id) REFERENCES artists(artist_id) ON DELETE CASCADE;

ALTER TABLE tracks
ADD FOREIGN KEY (album_id) REFERENCES albums(album_id) ON DELETE CASCADE;

ALTER TABLE tracks
ADD FOREIGN KEY (genre_id) REFERENCES genres(genre_id);
    
    
    
    


-- USER SPECIFIC TABLES

CREATE TABLE users 
(
	user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR NOT NULL UNIQUE,
    email VARCHAR NOT NULL UNIQUE,
    user_password VARCHAR NOT NULL,
    joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE playlists 
(
	playlist_id INT PRIMARY KEY AUTO_INCREMENT,
    playlist_name VARCHAR NOT NULL    
);

CREATE TABLE playlist_tracks
(
	playlist_tracks_id INT PRIMARY KEY AUTO_INCREMENT,
    playlist_id INT,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE playlist_tracks
ADD FOREIGN KEY (playlist_id) REFERENCES playlists(playlist_id) ON DELETE CASCADE;
	
    


