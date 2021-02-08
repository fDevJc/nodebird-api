const express = require('express');
const multer = require('multer');

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

try {
  router.post('/', upload.single('asb'), (req, res) => {
    console.log('test router execute');
    res.send('Hello Test');
  });
} catch (err) {
  console.log(err);
}

module.exports = router;
