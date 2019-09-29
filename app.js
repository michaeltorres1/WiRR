// Author:       Michael Torres
// Filename:     app.js
// Description:  The purpose of this file is to serve as the main entry file

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    );

    console.log('Connected to MongoDB...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Connected!!!'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/users', require('./routes/api/register'));
app.use('/api/articles', require('./routes/api/articles'));
app.use('/api/articles/search', require('./routes/api/search'));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));