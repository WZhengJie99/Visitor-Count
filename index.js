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
  res.setHeader('Cache-Control', 'no-store'); // Prevents caching
  res.setHeader('Content-Type', 'image/png');

  const siteIdentifier = req.query.siteIdentifier;
  const style = req.query.style || 'numbers';
  const isTestMode = req.query.test === 'true';

  if (!siteIdentifier) {
    return res.status(400).json({ error: 'Site identifier is required' });
  }

  try {
    const countStr = isTestMode ? '0123456789' : await getVisitorCount(siteIdentifier);

    const images = await Promise.all(
      [...countStr].map(digit => {
        const imgPath = path.join(__dirname, 'styles', style, `${digit}.png`);
        return loadImage(imgPath);
      })
    );

    const totalWidth = images.reduce((sum, img) => sum + img.width, 0);
    const maxHeight = Math.max(...images.map(img => img.height));

    const canvas = createCanvas(totalWidth, maxHeight);
    const ctx = canvas.getContext('2d');

    let x = 0;
    images.forEach(img => {
      ctx.drawImage(img, x, 0, img.width, img.height);
      x += img.width;
    });

    res.setHeader('Content-Type', 'image/png');
    canvas.pngStream().pipe(res);

  } catch (error) {
    console.error('Failed to generate counter image:', error);
    res.status(500).json({ error: 'Failed to generate counter image' });
  }
});

async function getVisitorCount(siteIdentifier) {
  let counter = await Counter.findOne({ siteIdentifier });
  if (!counter) {
    counter = new Counter({ siteIdentifier, count: 1 });
    await counter.save();
  } else {
    counter.count += 1;
    await counter.save();
  }
  return String(counter.count).padStart(7, '0');
}