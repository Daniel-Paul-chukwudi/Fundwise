require('dotenv').config()
const business = require('../models/business')
const businessModel = require('../models/business')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const likeModel = require('../models/like')
const viewModel = require('../models/view')
const saveModel = require('../models/save')
const ticketModel = require('../models/supportticket')

exports.createBusiness = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      businessName,
      fundGoal,
      description,
      industry,
      yearFounded,
      businessModel,
      revenueModel,
      targetMarket,
      fundingStage,
      fundingSought,
      currentRevenue,
      pitchDeck
    } = req.body;

    const newBusiness = await business.create({
      businessName,
      fundGoal,
      description,
      industry,
      yearFounded,
      businessModel,
      revenueModel,
      targetMarket,
      fundingStage,
      fundingSought,
      currentRevenue,
      pitchDeck,
      businessOwner: userId
    });

    res.status(201).json({
      message: "Business created successfully",
      data: newBusiness
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.likeBusiness = async (req, res) => {
  try {
    const { businessId } = req.body;
    const { id } = req.user;

    const business = await businessModel.findByPk(businessId);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    const likeCheck = await likeModel.findOne({ where: { userId: id, businessId } });

    if (likeCheck) {
      business.likeCount -= 1;
      await business.save();
      await likeModel.destroy({ where: { userId: id, businessId } });
      return res.status(200).json({
        message: "Unliked successfully",
        businesslikes: business.likeCount
      });
    } else {
      await likeModel.create({ userId: id, businessId });
      business.likeCount += 1;
      await business.save();
      return res.status(200).json({
        message: "Liked successfully",
        businesslikes: business.likeCount
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};


exports.viewBusiness = async (req, res) => {
  try {
    const { businessId } = req.body;
    const { id } = req.user;

    const user = await userModel.findByPk(id);
    const business = await businessModel.findByPk(businessId);

    if (!business) return res.status(404).json({ message: "Business not found" });

    const viewCheck = await viewModel.findOne({ where: { userId: id, businessId } });

    if (!user.subscribed) {
      return res.status(401).json({
        message:`Hello ${user.firstName}, your subscription has expired`
      });
    }

    if (!viewCheck) {
      await viewModel.create({ userId: id, businessId });
      business.viewCount += 1;
      await business.save();
      user.viewAllocation -= 1;
      if (user.viewAllocation <= 0) user.subscribed = false;
      await user.save();
    }

    return res.status(200).json({
      message: "Viewed successfully",
      businessviews: business.viewCount,
      data: business
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};


exports.saveBusiness = async (req, res) => {
  try {
    const { businessId } = req.body;
    const { id } = req.user;

    const business = await businessModel.findByPk(businessId);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    const saveCheck = await saveModel.findOne({ where: { userId: id, businessId } });

    if (saveCheck) {
      await saveModel.destroy({ where: { userId: id, businessId } });
      return res.status(200).json({
        message: "Unsaved successfully"
      });
    } else {
      await saveModel.create({ userId: id, businessId });
      return res.status(200).json({
        message: "Saved successfully",
        data: business
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};


exports.getBusiness = async (req, res) => {
  try {
    const businesses = await businessModel.findAll();
    res.status(200).json({
      message: "All businesses retrieved successfully",
      data: businesses
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};


exports.getOneById = async (req, res) => {
  try {
    const id = req.params.id;
    const target = await businessModel.findByPk(id);
    if (!target) {
      return res.status(404).json({ message: "Business not found" });
    }
    res.status(200).json({
      message: "Business found",
      data: target
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};


exports.getByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const targets = await businessModel.findAll({ where: { category } });
    res.status(200).json({
      message:`Businesses in the ${category} category`,
      data: targets
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};


exports.updateB = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const business = await businessModel.findByPk(id);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    await business.update(updates);
    res.status(200).json({
      message: "Business updated successfully",
      data: business
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.deleteB = async(req,res)=>{
    try {
        const id = req.params.id
        const target = await businessModel.findByPk(id)
        if(!target){
          return res.status(404).json({
            message:"business not found"
          })
        }
        await target.destroy()
        res.status(200).json({
            message:"Business data deleted successfully",
        })

    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}

exports.requestDelete = async(req,res)=>{
    try {
        const {id} = req.user
        const {businessId} = req.body
        const newTicket  = await ticketModel.create({
            userId:id,
            title:"Request to delete business",
            businessId,
            ticketStatus:"open"
        })
        res.status(201).json({
            message:"Your support Ticket has been created, you should recieve a response soon",
            data:newTicket
        })

    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}