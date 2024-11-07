require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const counterSchema = new mongoose.Schema({
  siteIdentifier: { type: String, required: true },
  count: { type: Number, default: 0 }
});
const Counter = mongoose.model('Counter', counterSchema);

app.use(express.static(__dirname));

app.get('/view', async (req, res) => {
  const siteIdentifier = req.query.siteIdentifier;

  if (!siteIdentifier) {
    return res.status(400).json({ error: 'Site identifier is required' });
  }

  try {
    let counter = await Counter.findOne({ siteIdentifier });
    if (!counter) {
      counter = new Counter({ siteIdentifier });
      await counter.save();
    }
    counter.count += 1;
    await counter.save();
    res.json({ count: counter.count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update counter' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const { createCanvas, loadImage } = require('canvas');

app.get('/counter-image', async (req, res) => {
  const siteIdentifier = req.query.siteIdentifier;
  if (!siteIdentifier) {
    return res.status(400).json({ error: 'Site identifier is required' });
  }

  try {
    let counter = await Counter.findOne({ siteIdentifier });
    if (!counter) {
      counter = new Counter({ siteIdentifier, count: 1 });
      await counter.save();
    } else {
      counter.count += 1;
      await counter.save();
    }

    const canvas = createCanvas(200, 50);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '30px Arial';
    ctx.fillStyle = '#000000';
    ctx.fillText(`Views: ${counter.count}`, 10, 35);

    res.setHeader('Content-Type', 'image/png');
    canvas.pngStream().pipe(res);

  } catch (error) {
    res.status(500).json({ error: 'Failed to generate counter image' });
  }
});
