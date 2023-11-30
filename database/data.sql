INSERT INTO "users" ("username", "hashedPassword")
     VALUES ('admin', '$argon2id$v=19$m=4096,t=3,p=1$I1HnApkzTksNXR/xUU/1IA$Fbwk8akxwwF6m8XbxSsihpPT+fK3JbzSL6VXa0BxRoo'),
            ('admin2', '$argon2id$v=19$m=4096,t=3,p=1$eODD9WcCYdKfUh5p5V1S2Q$mRDGuGpNbq31zfHX7VkA+MeAKJT6QiJ0FsOjfodH0IY');


INSERT INTO "videos" ("userId", "likes", "caption", "videoUrl", "thumbnailUrl", "uploadedAt")
     VALUES (1, 0, 'The GOAT', '/videos/faker-azir.mp4','/videos/faker-azir.gif', NOW() + interval '1 week'),          --1
            (1, 5, 'admin', '/videos/faker-azir-1.mp4','/videos/faker-azir-1.gif', NOW() + interval '2 week'),   --2
            (1, 5, '4X', '/videos/faker-azir-2.mp4','/videos/faker-azir-2.gif', NOW() + interval '3 week'),            --3
            (1, 5, 'T1 Dominance', '/videos/faker-azir-3.mp4','/videos/faker-azir-3.gif', NOW() + interval '4 week'),  --4
            (1, 5, 'WTFFF', '/videos/faker-azir-4.mp4','/videos/faker-azir-4.gif', NOW() + interval '5 week'),         --5
            (1, 5, 'GOAT', '/videos/faker-azir-5.mp4','/videos/faker-azir-5.gif', NOW() + interval '6 week'),          --6
            (1, 5, 'IDK', '/videos/faker-azir-6.mp4','/videos/faker-azir-6.gif', NOW() + interval '7 week'),           --7
            (1, 5, '2017 FLASHBACK', '/videos/faker-azir-7.mp4','/videos/faker-azir-7.gif', NOW() + interval '8 week'),--8
            (1, 5, 'Admin', '/videos/faker-azir-8.mp4','/videos/faker-azir-8.gif', NOW() + interval '9 week');         --9

INSERT INTO "tags" ("name")
     VALUES ('League of Legends'),          --1
            ('Faker'),                      --2
            ('Worlds 2023'),                --3
            ('T1'),                         --4
            ('JDG'),                        --5
            ('FRAUD'),                      --6
            ('JDG VS T1'),                  --7
            ('WOW'),                        --8
            ('LOL'),                        --9
            ('AZIR'),                       --10
            ('OP'),                         --11
            ('Delete Me');                  --12

INSERT INTO "videoTags" ("videoId", "tagId")
     VALUES (1, 1), (1, 2), (1, 3),
            (2, 6), (2, 9), (2, 10),
            (3, 12), (3, 11),
            (4, 1),
            (5, 4), (5, 5),
            (7, 1), (7, 3), (7, 5),
            (9, 8), (9, 11);

INSERT INTO "likedVideos" ("videoId", "userId")
     VALUES (3, 2);
