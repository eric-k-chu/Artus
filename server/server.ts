/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { ClientError, authMiddleware, errorMiddleware } from './lib/index.js';
import { uploadsMiddleware } from './lib/uploads-middleware.js';
import { compressVideo, type CompressedVideos } from './lib/compressVideo.js';
import { Multer } from 'multer';

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

export type Auth = {
  username: string;
  password: string;
};

export type User = {
  userId: number;
  username: string;
  hashedPassword: string;
};

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

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));

app.use(express.json());

app.post('/api/auth/register', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields.');
    }
    // Checking if username exists
    const checkSql = `SELECT *
                        FROM "users"
                       WHERE "username" = $1`;
    const userData = await db.query<User>(checkSql, [username]);
    if (userData.rows[0]) {
      throw new ClientError(409, 'username already exists.');
    }

    const hashedPassword = await argon2.hash(password);
    const sql = `
      INSERT INTO "users" ("username", "hashedPassword")
           VALUES ($1, $2)
           RETURNING "userId", "username"
    `;
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
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
      SELECT "userId",
             "hashedPassword"
        FROM "users"
       WHERE "username" = $1
    `;
    const result = await db.query<User>(sql, [username]);
    const user = result.rows[0];

    if (!user) throw new ClientError(404, 'User does not exist.');

    const { userId, hashedPassword } = user;
    if (!(await argon2.verify(hashedPassword, password))) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, hashKey);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

app.get('/api/videos', async (req, res, next) => {
  try {
    const sql = 'SELECT * FROM "videos"';
    const result = await db.query(sql);
    res.status(201).json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.post(
  '/api/videos/:userId',
  authMiddleware,
  uploadsMiddleware.array('videos'),
  async (req, res, next) => {
    console.log('compression now');
    try {
      if (!req.files) throw new ClientError(400, 'no file field in request');
      const files = req.files as Express.Multer.File[];
      const compressed: Promise<CompressedVideos>[] = [];
      for (let i = 0; i < files.length; i++) {
        const { filename, path } = files[i];
        compressed.push(compressVideo(filename, path));
      }
      const result = await Promise.all(compressed);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
);

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
