require('dotenv').config()
const meetingModel = require('../models/meeting')
const userModel = require('../models/user')
const investorModel = require('../models/investor')
const LINK = process.env.meetingLink



// Create a new meeting
exports.createMeetingInvestor = async (req, res) => {
  try {
    const {id} = req.user
    const { meetingTitle, date, time, meetingType, note , guest } = req.body;

    // Check if the title already exists
    const existingMeeting = await meetingModel.findOne({ where: { meetingTitle } });
    if (existingMeeting) {
      return res.status(400).json({ 
        message: 'Meeting title already exists' 
      });
    }
    const UserB = await userModel.findByPk(guest)
    const UserI = await investorModel.findByPk(id)

    // if(!UserB && !UserI){
    //   return res.status(404).json({
    //     message:"user not found"
    //   })
    // }
    // let hostType = ''
    // let hostName = ''
    // let guest = ''
    // if(!UserB){
    //   hostType = 'Investor'
    //   hostName = `${UserI.firstName} ${UserI.lastName}`
    //   guest = `${UserB.firstName} ${UserB.lastName}`
    // }else{
    //   hostType = 'businessOwner'
    //   hostName = `${UserB.firstName} ${UserB.lastName}`
    //   guest = `${UserI.firstName} ${UserI.lastName}`
    // }

    // hostName = `${UserI.firstName} ${UserI.lastName}`
    // guestName = `${UserB.firstName} ${UserB.lastName}`


    const meeting = await meetingModel.create({
      host:id,
      guest,
      meetingTitle,
      meetingLink:LINK,
      date,
      time,
      meetingType,
      note,
      meetingStatus:"Awaiting Approval"
    });

    res.status(201).json({
      message: 'Meeting created successfully',
      data: meeting,
      // hostName,
      // guestName
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating meeting', 
      error: error.message 
    });
  }
};

exports.approveMeeting = async (req,res)=>{
  try {
    const {id} = req.user
    const {meetingId}  = req.body
    const targetH = await meetingModel.findOne({where:{host:id,meetingId}})
    const targetG = await meetingModel.findOne({where:{guest:id,meetingId}})
    console.log(targetG);
    console.log(targetH)
    

    if(!targetH && !targetG){
      return res.status(404).json({
        message:"Oops it seems like the meeting does not exist "
      })
    }else if(!targetG){
      targetH.meetingStatus = "Approved and Upcoming"
      await targetH.save()
    }else if(!targetH){
      targetG.meetingStatus = "Approved and Upcoming"
      await targetG.save()
    }
    res.status(200).json({
      message:"Approved meeting",
      data:targetH??targetG
    })
  } catch (error) {
    res.status(500).json({ 
      message: 'Error approving meeting', 
      error: error.message 
    });
  }
}

exports.rescheduleMeeting = async(req,res)=>{
  try {
    const {id} = req.user
    const {meetingId, date, time}  = req.body
    const target = await meetingModel.findOne({where:{guest:id}})

    if(!target){
      return res.status(404).json({
        message:"Oops it seems like the meeting does not exist "
      })
    }
    await target.update({date,time,meetingStatus:"Reschedule Requested"})


    
    res.status(200).json({
      message:"changes made awaiting approval",
      data:target
    })
  } catch (error) {
    res.status(500).json({ 
      message: 'Error approving meeting', 
      error: error.message 
    });
  }
}

// Get all meetings
exports.getAllMeetings = async (req, res) => {
  try {
    const meetings = await meetingModel.findAll();
    res.status(200).json({ 
      data: meetings 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching meetings', 
      error: error.message 
    });
  }
};

// Get a single meeting by ID
exports.getMeetingById = async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await meetingModel.findByPk(id);

    if (!meeting) {
      return res.status(404).json({ 
        message: 'Meeting not found' 
      });
    }

    res.status(200).json({ 
      data: meeting 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching meeting', 
      error: error.message 
    });
  }
};

// Update a meeting
exports.updateMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const { meetingTitle, date, time, meetingType, note } = req.body;

    const meeting = await meetingModel.findByPk(id);
    if (!meeting) {
      return res.status(404).json({ 
        message: 'Meeting not found' 
      });
    }

    await meeting.update({ meetingTitle, date, time, meetingType, note });

    res.status(200).json({
      message: 'Meeting updated successfully',
      data: meeting,
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating meeting', 
      error: error.message 
    });
  }
};

// Delete a meeting
exports.deleteMeeting = async (req, res) => {
  try {
    const { id } = req.params;

    const meeting = await meetingModel.findByPk(id);
    if (!meeting) {
      return res.status(404).json({ 
        message: 'Meeting not found' 
      });
    }

    await meeting.destroy();

    res.status(200).json({ 
      message: 'Meeting deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting meeting', 
      error: error.message 
    });
  }
};