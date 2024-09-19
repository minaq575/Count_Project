const express = require('express');
const cors = require('cors');

const app = express();

// Allow requests from your frontend origin
app.use(cors({
  origin: 'https://count-project-eta.vercel.app',
}));

// Other middleware and routes
app.get('/api/counter', (req, res) => {
  res.json({ count: 0 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
