INSERT INTO "users" ("username", "hashedPassword")
     VALUES ('admin', '$argon2id$v=19$m=4096,t=3,p=1$I1HnApkzTksNXR/xUU/1IA$Fbwk8akxwwF6m8XbxSsihpPT+fK3JbzSL6VXa0BxRoo');


INSERT INTO "videos" ("userId", "likes", "caption", "videoUrl", "thumbnailUrl")
     VALUES (1, 0, 'The GOAT', '/videos/faker-azir.mp4','/videos/faker-azir.gif'),          --1
            (1, 5, 'FAKKKEEERRR', '/videos/faker-azir-1.mp4','/videos/faker-azir-1.gif'),   --2
            (1, 5, '4X', '/videos/faker-azir-2.mp4','/videos/faker-azir-2.gif'),            --3
            (1, 5, 'T1 Dominance', '/videos/faker-azir-3.mp4','/videos/faker-azir-3.gif'),  --4
            (1, 5, 'WTFFF', '/videos/faker-azir-4.mp4','/videos/faker-azir-4.gif'),         --5
            (1, 5, 'GOAT', '/videos/faker-azir-5.mp4','/videos/faker-azir-5.gif'),          --6
            (1, 5, 'IDK', '/videos/faker-azir-6.mp4','/videos/faker-azir-6.gif'),           --7
            (1, 5, '2017 FLASHBACK', '/videos/faker-azir-7.mp4','/videos/faker-azir-7.gif'),--8
            (1, 5, 'Weird', '/videos/faker-azir-8.mp4','/videos/faker-azir-8.gif');         --9

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
