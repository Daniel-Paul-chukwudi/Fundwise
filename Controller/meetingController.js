require('dotenv').config()
const meetingModel = require('../models/meeting')


// Create a new meeting
exports.createMeeting = async (req, res) => {
  try {
    const { meetingTitle, date, time, meetingType, note } = req.body;

    // Check if the title already exists
    const existingMeeting = await meetingModel.findOne({ where: { meetingTitle } });
    if (existingMeeting) {
      return res.status(400).json({ message: 'Meeting title already exists' });
    }

    const meeting = await meetingModel.create({
      meetingTitle,
      date,
      time,
      meetingType,
      note,
    });

    res.status(201).json({
      message: 'Meeting created successfully',
      data: meeting,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating meeting', error: error.message });
  }
};

// Get all meetings
exports.getAllMeetings = async (req, res) => {
  try {
    const meetings = await meetingModel.findAll();
    res.status(200).json({ data: meetings });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meetings', error: error.message });
  }
};

// Get a single meeting by ID
exports.getMeetingById = async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await meetingModel.findByPk(id);

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.status(200).json({ data: meeting });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meeting', error: error.message });
  }
};

// Update a meeting
exports.updateMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const { meetingTitle, date, time, meetingType, note } = req.body;

    const meeting = await meetingModel.findByPk(id);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    await meeting.update({ meetingTitle, date, time, meetingType, note });

    res.status(200).json({
      message: 'Meeting updated successfully',
      data: meeting,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating meeting', error: error.message });
  }
};

// Delete a meeting
exports.deleteMeeting = async (req, res) => {
  try {
    const { id } = req.params;

    const meeting = await meetingModel.findByPk(id);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    await meeting.destroy();

    res.status(200).json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting meeting', error: error.message });
  }
};