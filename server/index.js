const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mount card routes
const cardRoutes = require('./api/cards');
app.use('/api', cardRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend ist verbunden!' });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
