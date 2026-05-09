const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'database.json');

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increased limit to accommodate base64 image data
app.use(express.static(__dirname));

// Ensure database file exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({}));
}

// Get the saved invoice
app.get('/api/invoice', (req, res) => {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

// Save the invoice
app.post('/api/invoice', (req, res) => {
  try {
    const invoiceData = req.body;
    fs.writeFileSync(DB_FILE, JSON.stringify(invoiceData, null, 2));
    res.json({ success: true, message: 'Invoice saved to memory.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save to database' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Open this URL in your browser to use the Invoice Generator.`);
});
