const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/memory-card-game', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ScoreSchema = new mongoose.Schema({
  tries: Number,
  time: Number,
});

const Score = mongoose.model('Score', ScoreSchema);

app.post('/api/scores', async (req, res) => {
  try {
    const { tries, time } = req.body;
    const newScore = new Score({ tries, time });
    await newScore.save();
    res.status(201).json(newScore);
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/scores', async (req, res) => {
  try {
    const scores = await Score.find().sort({ tries: 1, time: 1 }).limit(10);
    res.status(200).json(scores);
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
