CREATE TABLE helo_users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(50),
    profile_pic VARCHAR(9999)
);

CREATE TABLE helo_posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(45),
    content VARCHAR(9999),
    img VARCHAR(9999),
    author_id INT,
    date_created timestamp
);