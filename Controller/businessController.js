const Business = require('../models/business');
const { verify, forgotPassword } = require('../Middleware/emailTemplates');
const sendEmail = require('../Middleware/Bmail');

exports.registerBusiness = async (req, res) => {
  try {
    const { businessName, email, password } = req.body;

    const newBusiness = await Business.create({
      businessName,
      email,
      password,
    });

    res.status(201).json({
      message: 'Business created successfully',
      data: newBusiness,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};
exports.getAllBusiness = async (req, res) => {
  try {
    const businesses = await Business.findAll();

    res.status(200).json({
      message: 'All available businesses below',
      data: businesses,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// Get one business
exports.getOneBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const business = await Business.findOne({ where: { id } });

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.status(200).json({
      message: 'Business found',
      data: business,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

exports.updateBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Business.update(req.body, { where: { id } });

    if (!updated) {
      return res.status(404).json({ message: 'Business not found' });
    }

    const updatedBusiness = await Business.findOne({ where: { id } });

    res.status(200).json({
      message: 'Business updated successfully',
      data: updatedBusiness,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

exports.deleteBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Business.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.status(200).json({ message: 'Business deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};
