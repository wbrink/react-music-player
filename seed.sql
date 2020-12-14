USE music_player;

-- example of how the user will be stored (password will be hashed though)
-- INSERT INTO users (username, email, user_password) 
-- VALUES ('test', 'test@gmail.com', '123456');

SELECT * FROM users;
DELETE FROM users;
ALTER TABLE users AUTO_INCREMENT = 1;

-- SELECT * FROM sessions;
-- DELETE FROM sessions;

-- Song List From Youtube Audio Library
-- Soft Feeling Jazz & Blues Romantic Cheel 2:55, AlbumOne
-- Lazy Walk, '',  Calm, Cheel, 2:41, AlbumOne
-- Kurt, Alternative & Punk, Dark, Cheel, 3:19, AlbumSix
-- Leaning On the Everlasting Arms Country & Folk, Calm, Zacharia Hickman, 2:59, AlbumTwo
-- The Joint is Jumpin Jazz & Blues, Happy, Joel Cummins, 1:45, AlbumThree
-- King Porter Stomp Jazz & Blues, Happy, Joel Cummins, 1:41, AlbumThree
-- Pine Street Country & Folk, Happy, Reed Mathis, 2:11, AlbumFour
-- Communicator Country & Folk, Happy, Reed Mathis, 2:31, CustomAlbum

/*
DELETE FROM artists;
ALTER TABLE artists AUTO_INCREMENT = 1;

DELETE FROM albums;
ALTER TABLE albums AUTO_INCREMENT = 1;

DELETE FROM tracks;
ALTER TABLE tracks AUTO_INCREMENT = 1;

DELETE FROM genres;
ALTER TABLE genres AUTO_INCREMENT = 1;
*/

INSERT INTO genres (genre_name) VALUES ("Jazz & Blues"), ("Country & Folk"), ("Alternative & Punk");
INSERT INTO artists SET artist_name = "Cheel"; -- 1
INSERT INTO artists SET artist_name = "Zacharia Hickman"; -- 2
INSERT INTO artists SET artist_name = "Joel Cummins"; -- 3
INSERT INTO artists SET artist_name = "Reed Mathis"; -- 4

-- INSERT SONGS

-- Cheel Songs
-- INSERT INTO artists SET artist_name = "Cheel"; -- 1
-- SET @artist_id := last_insert_id();
SET @artist_id = 1;
SELECT genre_id FROM genres WHERE genre_name = "Jazz & Blues" LIMIT 1 INTO @genre_id;
# SELECT @artist_id; 
# SELECT @genre_id;
INSERT INTO albums (album_name, artist_id, genre_id, release_date) 
VALUES ("AlbumOne", @artist_id, @genre_id, CAST("2017-08-29" AS DATE));

SET @album_id := last_insert_id();
INSERT INTO tracks (track_name, genre_id, album_id, track_number, duration, artist_id) 
VALUES ("Soft Feeling", @genre_id, @album_id, 1, 175, @artist_id);

INSERT INTO tracks (track_name, genre_id, album_id, track_number, duration, artist_id) 
VALUES ("Lazy Walk", @genre_id, @album_id, 2, 161, @artist_id);

INSERT INTO albums (album_name, artist_id, genre_id, release_date) VALUES ("AlbumSix", @artist_id, 3, CAST("2018-09-22" AS DATE));

INSERT INTO tracks (track_name, genre_id, album_id, track_number, duration, artist_id)
VALUES ("Kurt", 3, 2, 1, 199, @artist_id); 

-- Zacharia Hickman
INSERT INTO albums (album_name, artist_id, genre_id, release_date) VALUES ("AlbumTwo", 2, 2, CAST("2015-03-21" AS DATE));
SET @album_id = last_insert_id();
INSERT INTO tracks (track_name, duration, track_number, album_id, genre_id, artist_id) VALUES ("Leaning On the Everlasting Arms", 179, 1, @album_id, 2, 2);

-- Joel Cummins
INSERT INTO albums (album_name, artist_id, genre_id, release_date) VALUES ("AlbumThree", 3, 1, CAST("2010-03-21" AS DATE));
SET @album_id = last_insert_id();
INSERT INTO tracks (track_name, duration, track_number, album_id, genre_id, artist_id) 
VALUES 
("The Joint is Jumpin", 105, 1, @album_id, 2, 3),
("King Porter Stomp", 101, 1, @album_id, 2, 3);
		
-- Reed Mathis
INSERT INTO albums (album_name, artist_id, genre_id, release_date) VALUES ("AlbumFour", 4, 2, CAST("2012-02-08" AS DATE));
SET @album_id = last_insert_id();
INSERT INTO tracks (track_name, duration, track_number, album_id, genre_id, artist_id) 
VALUES 
("Pine Street", 131, 1, @album_id, 2, 4);

INSERT INTO albums (album_name, artist_id, genre_id, release_date) VALUES ("CustomAlbum", 4, 2, CAST("2013-02-08" AS DATE));
SET @album_id = last_insert_id();
INSERT INTO tracks (track_name, duration, track_number, album_id, genre_id, artist_id) 
VALUES 
("Communicator", 151, 1, @album_id, 2, 4);


SELECT * FROM tracks;
SELECT * FROM genres;
SELECT * FROM artists;
SELECT * FROM albums;


-- query to show track that will be shown on website
SELECT t.track_name AS Track, a.artist_name AS Artist, al.album_name AS Album, g.genre_name AS Genre, t.duration AS Duration
FROM tracks t
JOIN artists a ON t.artist_id = a.artist_id
JOIN albums al ON t.album_id = al.album_id
JOIN genres g ON t.genre_id = g.genre_id
ORDER BY t.track_name;


DROP PROCEDURE IF EXISTS searchTracks;
DROP PROCEDURE IF EXISTS searchArtists;
DROP PROCEDURE IF EXISTS searchAlbums;
DROP PROCEDURE IF EXISTS getArtistTopTracks;


-- stored procedure for searching
DELIMITER $$ 
CREATE PROCEDURE searchTracks(
	IN search VARCHAR(255))
BEGIN 
	SELECT t.track_id, t.track_name, a.artist_name, al.album_name, al.album_art_path, t.duration 
    FROM tracks t
    JOIN artists a ON t.artist_id = a.artist_id
    JOIN albums al ON t.album_id = al.album_id
    WHERE t.track_name LIKE concat(search, '%')
    ORDER BY t.plays
    LIMIT 4;
END $$
DELIMITER ;


DELIMITER $$ 
CREATE PROCEDURE searchArtists(
	IN search VARCHAR(255))
BEGIN 
    -- get artists with name like search 
    SELECT artist_id, artist_name, artist_picture_path
    FROM artists
    WHERE artist_name LIKE concat(search, '%')
    LIMIT 8;
END $$
DELIMITER ;

DELIMITER $$ 
CREATE PROCEDURE searchAlbums(
	IN search VARCHAR(255))
BEGIN 
    -- get albums with name like search 
    SELECT albums.album_id, albums.album_name, albums.release_date, albums.album_art_path, artists.artist_name 
    FROM albums
    JOIN artists ON albums.artist_id = artists.artist_id
    WHERE albums.album_name LIKE concat(search, '%')
    LIMIT 8;
END $$
DELIMITER ;


SELECT * FROM users WHERE user_id = 3;

SELECT * FROM artists;

CALL searchTracks("soft");
CALL searchArtists("che");
CALL searchAlbums("album");

CALL searchTracks("");

SELECT * FROM tracks;

-- when someone searches for artist


DELIMITER $$ 
CREATE PROCEDURE getArtistTopTracks(
	IN search INT)
BEGIN 
    SELECT t.track_id, t.track_name, t.duration, t.plays, a.artist_id, a.artist_name, al.album_art_path
	FROM artists a
	JOIN tracks t ON t.artist_id = a.artist_id
	JOIN albums al ON t.album_id = al.album_id 
	WHERE a.artist_id = search
	ORDER BY t.plays
    LIMIT 10;

END $$
DELIMITER ;

DELIMITER $$ 
CREATE PROCEDURE getArtistDiscography(
	IN search INT)
BEGIN 
   -- get artist Discography
	SELECT al.album_id, al.album_name, al.release_date, al.album_art_path
	FROM albums al
	WHERE al.artist_id = search
	ORDER BY al.release_date ASC;
END $$
DELIMITER ;

SELECT t.track_id, t.track_name, a.artist_name, a.artist_id, a.artist_picture_path, al.album_id, al.album_name, al.album_art_path, al.release_date, t.plays, t.duration 
FROM tracks t
JOIN artists a ON a.artist_id = t.artist_id
JOIN albums al ON t.album_id = al.album_id
WHERE t.album_id = 2;



CALL getArtistTopTracks(1);
CALL getArtistDiscography(3);