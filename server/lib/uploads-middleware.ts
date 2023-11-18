import path from 'node:path';
import multer from 'multer';

const videosDirectory = 'public/temp';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, videosDirectory);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, fileExt);
    const name = `${fileName}-${Date.now()}${fileExt}`;
    console.log('Received ', fileName);
    cb(null, name);
  },
});

export const uploadsMiddleware = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});
