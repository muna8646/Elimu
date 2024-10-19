const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/lms', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Instructor Schema
const instructorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true }, // Unique constraint for phone number
  country: { type: String, required: true },
  idNumber: { type: String, required: true, unique: true }, // Unique constraint for ID number
  school: { type: String, required: true },
  email: { type: String, required: true, unique: true }  // Unique constraint for email
});

const Instructor = mongoose.model('Instructor', instructorSchema);

// POST route to handle form submission
app.post('/api/instructors', async (req, res) => {
  const { fullName, phoneNumber, country, idNumber, school, email } = req.body;

  try {
    // Check for existing instructor with the same phone number, ID number, or email
    const existingInstructor = await Instructor.findOne({
      $or: [
        { phoneNumber },
        { idNumber },
        { email }
      ]
    });

    if (existingInstructor) {
      return res.status(400).send('An instructor with this phone number, ID number, or email already exists!');
    }

    const newInstructor = new Instructor({ fullName, phoneNumber, country, idNumber, school, email });
    await newInstructor.save();
    res.status(200).send('Instructor application submitted!');
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).send('Error submitting application');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
