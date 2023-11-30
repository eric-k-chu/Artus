INSERT INTO "users" ("username", "hashedPassword")
     VALUES ('admin', '$argon2id$v=19$m=4096,t=3,p=1$I1HnApkzTksNXR/xUU/1IA$Fbwk8akxwwF6m8XbxSsihpPT+fK3JbzSL6VXa0BxRoo'),
            ('admin2', '$argon2id$v=19$m=4096,t=3,p=1$eODD9WcCYdKfUh5p5V1S2Q$mRDGuGpNbq31zfHX7VkA+MeAKJT6QiJ0FsOjfodH0IY');


INSERT INTO "videos" ("userId", "likes", "caption", "videoUrl", "thumbnailUrl", "uploadedAt")
     VALUES (1, 0, 'The GOAT', '/videos/faker-azir.mp4','/videos/faker-azir.gif', NOW() - interval '1 week'),          --1
            (1, 5, 'PARKOUR', '/videos/test-1.mp4','/videos/test-1.gif', NOW() - interval '2 week'),   --2
            (1, 5, 'GET OVERR HEREE', '/videos/test-2.mp4','/videos/test-2.gif', NOW() - interval '3 week'),            --3
            (1, 5, 'Racers cornering in slow-mo', '/videos/test-3.mp4','/videos/test-3.gif', NOW() - interval '4 week'),  --4
            (2, 5, 'Old Daigo Moment', '/videos/test-4.mp4','/videos/test-4.gif', NOW() - interval '5 week'),         --5
            (2, 5, 'Bocchi Slayer', '/videos/test-5.mp4','/videos/test-5.gif', NOW() - interval '6 week'),          --6
            (2, 5, 'Playing God', '/videos/test-6.mp4','/videos/test-6.gif', NOW() - interval '7 week'),           --7
            (2, 5, 'Cute Cat', '/videos/test-7.mp4','/videos/test-7.gif', NOW() - interval '8 week'),--8
            (2, 5, 'Oner destroys JDG', '/videos/test-8.mp4','/videos/test-8.gif', NOW() - interval '9 week');         --9

INSERT INTO "tags" ("name")
     VALUES ('League of Legends'),          --1
            ('Faker'),                      --2
            ('Cat'),                --3
            ('Parkour'),                         --4
            ('APEX Legends'),                        --5
            ('Daigo'),                      --6
            ('Street Fighter'),                  --7
            ('Bocchi'),                        --8
            ('Demon Slayer'),                        --9
            ('Oner'),                       --10
            ('Rell'),                         --11
            ('Polyphia');                  --12

INSERT INTO "videoTags" ("videoId", "tagId")
     VALUES (1, 1), (1, 2),
            (2, 4),
            (3, 5),
            (5, 6), (5, 7),
            (6, 8), (6, 9),
            (7, 12),
            (8, 3),
            (9, 10), (9, 1);

INSERT INTO "likedVideos" ("videoId", "userId")
     VALUES (3, 2), (1, 2), (6, 1), (7, 1);
