require('dotenv').config()
const meetingModel = require('../models/meeting')
const userModel = require('../models/user')
const investorModel = require('../models/investor')
const businessModel = require('../models/business')
const links = require('../helper/meetingLinks') 


exports.createMeetingInvestor = async (req, res) => {
  try {
    const {id} = req.user
    const { meetingTitle, date, time, meetingType, note , guest } = req.body;

    if(!meetingTitle || !date || !time || !meetingType || !note || !guest){
      return res.status(403).json({ 
        message: 'Please make sure all fields are filled' 
      });
    }

    // Check if the title already exists
    const existingMeeting = await meetingModel.findOne({ where: { meetingTitle } });
    if (existingMeeting) {
      return res.status(403).json({ 
        message: 'Meeting title already exists' 
      });
    }
    const UserB = await userModel.findByPk(guest)
    if (!UserB) {
      return res.status(404).json({ 
        message: 'BusinessOwner not found' 
      });
    }
    const UserI = await investorModel.findByPk(id)
    if (!UserI) {
      return res.status(404).json({ 
        message: 'Investor not found' 
      });
    }
    const LINK = links[Math.round(Math.random() *10)]
    console.log(LINK);
    
    const peop = await businessModel.findOne({where:{businessOwner:guest}})
    // console.log(peop);
    
    const meeting = await meetingModel.create({
      host:id,
      guest,
      meetingTitle,
      meetingLink:LINK,
      date,
      time,
      meetingType,
      note,
      meetingStatus:"Awaiting Approval",
      businessOwnerName:UserB.fullName,
      hostName:UserI.fullName,
      businessName: peop.businessName
    });

    res.status(201).json({
      message: 'Meeting created successfully',
      data: meeting
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
    const target = await meetingModel.findOne({where:{id:meetingId}})

    if(!target){
      return res.status(404).json({
        message:"Oops it seems like the meeting does not exist "
      })
    }
    target.meetingStatus = "Approved and Upcoming"
    await target.save()

    res.status(200).json({
      message:"Approved meeting",
      data:target
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
    const target = await meetingModel.findOne({where:{id:meetingId}})

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

exports.declineMeeting = async(req,res)=>{
  try {
    const {id} = req.user
    const {meetingId}  = req.body
    const target = await meetingModel.findOne({where:{id:meetingId}})

    if(!target){
      return res.status(404).json({
        message:"Oops it seems like the meeting does not exist "
      })
    }
    target.meetingStatus = "Declined"
    await target.save()

    res.status(200).json({
      message:"Declined meeting",
      data:target
    })
  } catch (error) {
    res.status(500).json({ 
      message: 'Error declining meeting', 
      error: error.message 
    });
  }
}

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

// exports.requestReschedule = async (req, res) => {
//   try {
//     const { id } = req.user;  
//     const { meetingId, date, time } = req.body; 
    
//     const meeting = await meetingModel.findOne({ where: { id: meetingId, guest: id } });

//     if (!meeting) {
//       return res.status(404).json({
//         message: "Meeting not found or you're not allowed to reschedule this meeting"
//       });
//     }


//     meeting.date = date;
//     meeting.time = time;
//     meeting.meetingStatus = "Reschedule Requested";
//     await meeting.save();

//     res.status(200).json({
//       message: "Reschedule request sent successfully. Waiting for investor's response.",
//       data: meeting
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error requesting reschedule",
//       error: error.message
//     });
//   }
// };



// exports.respondReschedule = async (req, res) => {
//   try {
//     const { id } = req.user; 
//     const { meetingId, action, date, time } = req.body; 
//     // action = "accept" | "decline" | "reschedule"

//     const meeting = await meetingModel.findOne({ where: { id: meetingId, host: id } });

//     if (!meeting) {
//       return res.status(404).json({ 
//         message: "Meeting not found or you're not the host of this meeting" 
//       });
//     }

    
//     if (action === "accept") {
//       meeting.meetingStatus = "Approved and Upcoming";
//     } else if (action === "decline") {
//       meeting.meetingStatus = "Declined";
//     } else if (action === "reschedule") {
//       meeting.date = date;
//       meeting.time = time;
//       meeting.meetingStatus = "Reschedule Requested";
//     } else {
//       return res.status(400).json({ message: "Invalid action type. Must be accept, decline, or reschedule." });
//     }

//     await meeting.save();

//     res.status(200).json({
//       message:`Meeting ${action}ed successfully.`,
//       data: meeting
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error responding to reschedule request",
//       error: error.message
//     });
//   }
// };

