export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { key } = req.body;
      
      // Simple authentication
      if (key !== 'your-secret-key') {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
      }
      
      // Read all data files
      const fs = require('fs');
      const path = require('path');
      
      const dataDir = path.join(process.cwd(), 'data');
      const files = fs.readdirSync(dataDir);
      
      const allData = files.map(file => {
        const filepath = path.join(dataDir, file);
        const content = fs.readFileSync(filepath, 'utf8');
        
        try {
          return {
            filename: file,
            data: JSON.parse(content)
          };
        } catch (e) {
          return {
            filename: file,
            data: content,
            parseError: true
          };
        }
      });
      
      return res.status(200).json({ success: true, data: allData });
    } catch (error) {
      console.error('Error retrieving data:', error);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
  } else {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}