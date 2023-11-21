INSERT INTO "users" ("username", "hashedPassword")
     VALUES ('admin', '$argon2id$v=19$m=4096,t=3,p=1$OOaXqQwryoUOCwQzC/ONAQ$Z0vAMlqKtgAtKIAKWq8cLFW6DUbMsHLSp1KPYPlN5dQ');

INSERT INTO "videos" ("userId", "likes", "caption", "videoUrl", "thumbnailUrl")
     VALUES (1, 5, 'The GOAT', '/videos/faker-azir.mp4','/videos/faker-azir.gif');


INSERT INTO "tags" ("name")
     VALUES ('League of Legends'), ('Faker'), ('Worlds 2023');

INSERT INTO "videoTags" ("videoId", "tagId")
     VALUES (1, 1), (1, 2), (1, 3);
