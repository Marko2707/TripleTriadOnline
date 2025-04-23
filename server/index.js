const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Für JSON-Parsing

// Einfache Test-Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend ist verbunden!' });
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});