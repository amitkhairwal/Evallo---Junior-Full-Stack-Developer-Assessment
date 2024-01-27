const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb+srv://amitkhairwal264:VaCacqEg8PCjVMcC@cluster0.g339b2x.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Content model Schema
const contentSchema = new mongoose.Schema({
  submissions: [
    {
      title: String,
      description: String,
      mockFile: String,
    },
  ],
});

const Content = mongoose.model('Content', contentSchema);

// API endpoint for content submission
app.post('/api/content', async (req, res) => {
  try {
    const { title, description, mockFile } = req.body;

    let content = await Content.findOne();
    if (!content) {
      content = new Content();
    }

    // Add the new submission to the array
    content.submissions.push({ title, description, mockFile });
    await content.save();

    res.status(201).json(content.submissions);
  } catch (error) {
    console.error('Error submitting content:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to fetch all content submissions
app.get('/api/content', async (req, res) => {
  try {
    const content = await Content.findOne();
    if (!content) {
      return res.json([]);
    }

    res.json(content.submissions);
  } catch (error) {
    console.error('Error fetching content submissions:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
