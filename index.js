const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`); // Fixed interpolation syntax
  }
});

const upload = multer({ storage: storage });

app.post('/uploads', upload.single('excelFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send('File uploaded successfully.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Fixed template literal syntax
});
