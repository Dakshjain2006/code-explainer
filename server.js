const express = require('express');
const cors = require('cors');
const path = require('path');

// Load .env file if present
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from /public
app.use(express.static(path.join(__dirname, 'public')));

// ═══════════════════════════════════════
// API Proxy — keeps the Anthropic API key
// on the server, never exposed to the client.
// ═══════════════════════════════════════
app.post('/api/explain', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: {
        message: 'ANTHROPIC_API_KEY is not set. Please add it to your .env file.'
      }
    });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('API Error:', err.message);
    res.status(500).json({ error: { message: err.message } });
  }
});

// Fallback: serve index.html for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n  🔍 CodeLens is running at http://localhost:${PORT}\n`);
});
