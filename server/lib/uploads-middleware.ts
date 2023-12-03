import path from 'node:path';
import multer from 'multer';

const videosDirectory = 'public/temp';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, videosDirectory);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const name = `${Date.now()}${fileExt}`;
    console.log('Received ', file.originalname);
    cb(null, name);
  },
});

export const uploadsMiddleware = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.size > 5 * 1024 * 1024) {
      return cb(null, false);
    }
    cb(null, true);
  },
});
