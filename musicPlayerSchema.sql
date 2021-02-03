DROP DATABASE IF EXISTS music_player;
CREATE DATABASE IF NOT EXISTS music_player;

use music_player;

-- MUSIC SPECIFIC TABLES

-- ARTISTS 
CREATE TABLE artists
(
	artist_id INT PRIMARY KEY AUTO_INCREMENT,
	artist_name VARCHAR(255) NOT NULL,
    artist_picture_path VARCHAR(255) DEFAULT "/artist_images/portrait-placeholder.png"
);

-- ALBUMS 
CREATE TABLE albums 
(
	album_id INT PRIMARY KEY AUTO_INCREMENT,
    album_name VARCHAR(255) NOT NULL,
    genre_id INT,
    artist_id INT,
    release_date DATE NOT NULL,
    album_art_path VARCHAR(255) DEFAULT "/album_covers/cover.jpg"
);


-- TRACKS 
CREATE TABLE tracks
(
	track_id INT PRIMARY KEY AUTO_INCREMENT,
    track_name VARCHAR(255) NOT NULL,
    duration INT NOT NULL, -- in seconds
    track_number INT NOT NULL,
    track_path VARCHAR(255),
    album_id INT,
    genre_id INT,
    artist_id INT,
    plays INT DEFAULT 0
);


-- GENRE 
CREATE TABLE genres
(
	genre_id INT PRIMARY KEY AUTO_INCREMENT,
    genre_name VARCHAR(255) NOT NULL
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
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS library_tracks;
CREATE TABLE library_tracks (
	user_id INT NOT NULL,
    track_id INT NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE playlists 
(
	playlist_id INT PRIMARY KEY AUTO_INCREMENT,
    playlist_name VARCHAR(255) NOT NULL,
    user_id INT,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE playlist_tracks
(
	playlist_tracks_id INT PRIMARY KEY AUTO_INCREMENT,
    playlist_id INT,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE library_tracks 
ADD FOREIGN KEY (track_id) REFERENCES tracks(track_id) ON DELETE CASCADE;

ALTER TABLE library_tracks
ADD FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;

ALTER TABLE playlists
ADD FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;

ALTER TABLE playlist_tracks
ADD FOREIGN KEY (playlist_id) REFERENCES playlists(playlist_id) ON DELETE CASCADE;
	


