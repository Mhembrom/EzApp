const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        // Process the ZIP file
        console.log('File uploaded:', req.file.filename);
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Simulate app conversion and file download
app.get('/download', (req, res) => {
    const filePath = path.join(__dirname, 'sample.apk'); // Replace with generated APK file
    res.download(filePath, 'YourApp.apk', (err) => {
        if (err) console.error(err);
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});