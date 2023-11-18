-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

INSERT INTO "users" ("users, hashedPassword")
     VALUES ('admin', '$argon2id$v=19$m=4096,t=3,p=1$OOaXqQwryoUOCwQzC/ONAQ$Z0vAMlqKtgAtKIAKWq8cLFW6DUbMsHLSp1KPYPlN5dQ')
