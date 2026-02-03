# 13.2
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL, likes numeric DEFAULT 0
);
INSERT INTO blogs (url, title) values ('www.com','hello');
INSERT INTO blogs (url, title) values ('www.hello.com','blogs');