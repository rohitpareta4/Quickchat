import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Setup __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Absolute path to upload folder
const uploadFolder = path.join(__dirname, '../public/images/uploads');

// ✅ Ensure the folder exists
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, (err, name) => {
      if (err) return cb(err);
      const fn = name.toString('hex') + path.extname(file.originalname);
      cb(null, fn);
    });
  },
});

const upload = multer({ storage });

export default upload;

