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


//Canvas
const { createCanvas, loadImage } = require('canvas');
const path = require('path');

app.get('/counter-image', async (req, res) => {
  const siteIdentifier = req.query.siteIdentifier;
  const style = req.query.style || 'numbers';

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

    const countStr = String(counter.count).padStart(7, '0');

    const digitWidth = 30;
    const margin = 2.5;
    const canvas = createCanvas(countStr.length * (digitWidth + margin) - margin, 50);
    const ctx = canvas.getContext('2d');

    let x = 0; // Track x position for each image
    for (const digit of countStr) {
      const imgPath = path.join(__dirname, style, `${digit}.png`);

      await loadImage(imgPath).then((img) => {
        ctx.drawImage(img, x, 0, digitWidth, img.height);
        x += digitWidth + padding;
      }).catch((error) => {
        console.error(`Error loading image for digit ${digit}:`, error);
      });
    }

    res.setHeader('Content-Type', 'image/png');
    canvas.pngStream().pipe(res);

  } catch (error) {
    console.error('Failed to generate counter image:', error);
    res.status(500).json({ error: 'Failed to generate counter image' });
  }
});
