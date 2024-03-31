// file_upload_service.js

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Upload a file
app.post('/upload', upload.single('file'), (req, res) => {
    const { file } = req;
    res.status(200).json({ message: 'File uploaded successfully', filename: file.filename });
});

// List uploaded files
app.get('/files', (req, res) => {
    fs.readdir('uploads/', (err, files) => {
        if (err) {
            res.status(500).json({ message: 'Error listing files' });
            return;
        }
        res.status(200).json({ files });
    });
});

// Download a file
app.get('/download/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'uploads', filename);
    res.download(filePath, (err) => {
        if (err) {
            res.status(404).json({ message: 'File not found' });
        }
    });
});

// Listen on port
const port = 3000;
app.listen(port, () => {
    console.log(`File upload service running on http://localhost:${port}`);
});
