import multer from 'multer';
import { randomUUID } from 'crypto';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/public/img/avatar');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  }
});

export const upload = multer({ storage });