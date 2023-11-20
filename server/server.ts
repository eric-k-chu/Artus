import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import format from 'pg-format';
import {
  ClientError,
  authMiddleware,
  errorMiddleware,
  uploadsMiddleware,
  convertVideos,
  logDuration,
  type Auth,
  type User,
  type Video,
  type ConvertedVideos,
  type VideoDetails,
} from './lib/index.js';

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.post('/api/auth/register', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(400, 'Username and password are required fields.');
    }

    const checkSql = `SELECT *
                        FROM "users"
                       WHERE "username" = $1`;
    const checkUser = await db.query<User>(checkSql, [username]);
    if (checkUser.rows[0]) {
      throw new ClientError(409, 'Username already exists.');
    }

    const hashedPassword = await argon2.hash(password);
    const sql = `
      INSERT INTO "users" ("username", "hashedPassword")
           VALUES ($1, $2)
           RETURNING "userId", "username"`;
    const result = await db.query<User>(sql, [username, hashedPassword]);
    const user = result.rows[0];
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(401, 'Invalid login.');
    }
    const sql = `
      SELECT "userId",
             "hashedPassword"
        FROM "users"
       WHERE "username" = $1
    `;
    const result = await db.query<User>(sql, [username]);
    const user = result.rows[0];

    if (!user)
      throw new ClientError(404, 'These credentials do not match our record.');

    const { userId, hashedPassword } = user;
    if (!(await argon2.verify(hashedPassword, password))) {
      throw new ClientError(401, 'Invalid login.');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, hashKey);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

app.get('/api/videos/all', async (req, res, next) => {
  try {
    const sql = 'SELECT * FROM "videos"';
    const result = await db.query<Video>(sql);
    res.status(201).json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/videos/:videoId', async (req, res, next) => {
  try {
    const videoId = Number(req.params.videoId);
    if (!Number.isInteger(videoId)) {
      throw new ClientError(400, 'videoId must be a positive integer.');
    }
    const sql = `SELECT *
                   FROM "videos"
                   JOIN "users" USING ("userId")
                  WHERE "videoId" = $1`;
    const result = await db.query<VideoDetails>(sql, [videoId]);
    const video = result.rows[0];
    if (!video) {
      throw new ClientError(404, `Cannot find video with id: ${videoId}`);
    }
    res.json(video);
  } catch (err) {
    next(err);
  }
});

app.get('/api/videos', authMiddleware, async (req, res, next) => {
  try {
    const sql = `SELECT *
                   FROM "videos"
                   JOIN "videoTags" USING ("videoId")
                   JOIN "tags" USING ("tagId")
                  WHERE "userId" = $1
                  ORDER BY "uploadedAt DESC`;
    const result = await db.query<Video>(sql, [req.user?.userId]);
    res.status(201).json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.post(
  '/api/videos',
  authMiddleware,
  uploadsMiddleware.array('videos'),
  async (req, res, next) => {
    try {
      if (!req.files) throw new ClientError(400, 'no file field in request');

      const files = req.files as Express.Multer.File[];
      const convertedVideos: ConvertedVideos[] = await convertVideos(files);

      console.log('Inserting into database...');
      const values: (number | string | undefined)[][] = [];
      for (const vids of convertedVideos) {
        const { videoUrl, thumbnailUrl, originalname } = vids;
        values.push([
          req.user?.userId,
          0,
          originalname,
          videoUrl,
          thumbnailUrl,
        ]);
      }

      const sql = format(
        `INSERT INTO "videos" ("userId", "likes", "caption", "videoUrl", "thumbnailUrl")
                               VALUES %L RETURNING *`,
        values,
      );
      const result = await db.query<Video>(sql);
      console.log('Sending to client...');
      res.status(201).json(result.rows);
    } catch (err) {
      next(err);
    }
  },
);

app.get('/api/ffprobe', async (req, res) => {
  const { path } = req.body;
  logDuration(path);
  res.sendStatus(200);
});

// app.put('/api/:userId/videos/:videoId', async (req, res, next) => {
//   try {
//     const { caption, tags } = req.body as UpdatedVideo;
//     const { userId, videoId } = req.params;
//     const jwtUserId = req.user?.userId;
//     checkUserId(Number(userId), jwtUserId);

//     validateUpdatedVideo(Number(videoId), caption, tags);

//     const videoSql = `UPDATE "videos"
//                          SET "caption" = $1,
//                        WHERE "videoId" = $2
//                        RETURNING "videoId", "caption"`;
//     const result = await db.query(videoSql, [caption, videoId]);
//     const videoInfo = result.rows[0];
//     if (!videoInfo)
//       throw new ClientError(404, `video with ${videoId} not found`);

//     validateTags(tags);

//     let tagInfo;
//     if (tags) {
//       const tagsArr = await removeExistingTags(tags, db);
//       const tagsSql = generateInsertTagsSql(tagsArr);
//       const tagResult = await db.query(tagsSql);
//       tagInfo = tagResult.rows;
//     }
//     res.status(201).json({ videoInfo, tagInfo });
//   } catch (err) {
//     next(err);
//   }
// });

/**
 * Serves React's index.html if no api route matches.
 *
 * Implementation note:
 * When the final project is deployed, this Express server becomes responsible
 * for serving the React files. (In development, the Vite server does this.)
 * When navigating in the client, if the user refreshes the page, the browser will send
 * the URL to this Express server instead of to React Router.
 * Catching everything that doesn't match a route and serving index.html allows
 * React Router to manage the routing.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
