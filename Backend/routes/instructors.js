const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor'); // Import the Instructor model

// Check for duplicates
router.post('/check-duplicate', async (req, res) => {
  const { phoneNumber, idNumber, email } = req.body;

  try {
    // Check if any record exists with the provided phone number, ID number, or email
    const existingInstructor = await Instructor.findOne({
      $or: [
        { phoneNumber },
        { idNumber },
        { email }
      ]
    });

    return res.status(200).json({ duplicate: !!existingInstructor });
  } catch (error) {
    console.error('Error checking duplicates:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Route to create a new instructor
router.post('/instructors', async (req, res) => {
  const { fullName, phoneNumber, country, idNumber, school, email } = req.body;

  try {
    const newInstructor = new Instructor({
      fullName,
      phoneNumber,
      country,
      idNumber,
      school,
      email,
    });

    await newInstructor.save();
    return res.status(201).json({ message: 'Instructor created successfully!' });
  } catch (error) {
    console.error('Error creating instructor:', error);
    return res.status(400).json({ error: 'Error creating instructor' });
  }
});

// API route to get all instructors
router.get('/instructors', async (req, res) => {
  try {
    const instructors = await Instructor.find(); // Fetch all instructors from MongoDB
    res.json(instructors); // Return the instructors as JSON
  } catch (error) {
    console.error('Error fetching instructors:', error);
    res.status(500).json({ message: 'Error fetching instructors' });
  }
});

// API route to approve an instructor
router.post('/approve-instructor/:id', async (req, res) => {
  const instructorId = req.params.id;
  try {
    await Instructor.findByIdAndUpdate(instructorId, { approved: true }); // Approve the instructor
    res.json({ message: 'Instructor approved successfully' });
  } catch (error) {
    console.error('Error approving instructor:', error);
    res.status(500).json({ message: 'Error approving instructor' });
  }
});

module.exports = router;
