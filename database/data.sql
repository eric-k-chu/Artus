-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

INSERT INTO "users" ("username", "hashedPassword")
     VALUES ('admin', '$argon2id$v=19$m=4096,t=3,p=1$OOaXqQwryoUOCwQzC/ONAQ$Z0vAMlqKtgAtKIAKWq8cLFW6DUbMsHLSp1KPYPlN5dQ');

INSERT INTO "videos" ("userId", "likes", "caption", "videoUrl", "thumbnailUrl")
     VALUES (1, 0, 'Example 1', '/videos/1-1700323079431.mp4-compressed.mp4','/videos/1-1700323079431.mp4-compressed.gif'),
            (1, 50, 'Example 2', '/videos/2-1700323079511.mp4-compressed.mp4', '/videos/2-1700323079511.mp4-compressed.gif'),
            (1, 3, 'Example 3', '/videos/3-1700323079638.mp4-compressed.mp4', '/videos/3-1700323079638.mp4-compressed.gif');

INSERT INTO "tags" ("name")
     VALUES ('React'), ('TypeScript'), ('Project');

INSERT INTO "videoTags" ("videoId", "tagId")
     VALUES (1, 1), (2, 2), (3, 3);
