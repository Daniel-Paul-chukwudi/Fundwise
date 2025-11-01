const KycModel = require('../models/kyc');
const UserModel = require('../models/user');

exports.createKyc = async (req, res) => {
  try {
    const userId = req.user.id;

    const existingKyc = await KycModel.findOne({ where: { userId } });
    if (existingKyc) {
      return res.status(400).json({ message: 'KYC already exists for this user' });
    }

    const governmentIdFile = req.files?.governmentId?.[0]?.buffer || null;
    const proofOfAddressFile = req.files?.proofOfAddress?.[0]?.buffer || null;

    const {
      firstName,
      lastName,
      dateOfBirth,
      phoneNumber,
      email,
      nationality,
      residentialAddress,
      city,
      state,
      investmentType,
      investmentRange,
      preferredSelectors
    } = req.body;

    const newKyc = await KycModel.create({
      userId,
      firstName,
      lastName,
      dateOfBirth,
      phoneNumber,
      email,
      nationality,
      residentialAddress,
      city,
      state,
      investmentType,
      investmentRange,
      preferredSelectors,
      governmentIdFile,
      proofOfAddressFile
    });

    res.status(201).json({
      message: 'KYC created successfully',
      data: newKyc
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

exports.getAllKycs = async (req, res) => {
  try {
    const kycs = await KycModel.findAll({include: { model: UserModel, as: 'user' },
      attributes: { exclude: ['governmentIdFile', 'proofOfAddressFile'] }
    });

    res.status(200).json({
      message: 'All KYCs fetched successfully',
      count: kycs.length,
      data: kycs
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

exports.getKycById = async (req, res) => {
  try {
    const id = req.params.id;
    const kyc = await KycModel.findByPk(id, {
      include: { model: UserModel, as: 'user' }
    });

    if (!kyc) return res.status(404).json({ message: 'KYC not found' });

    res.status(200).json({
      message: 'KYC found',
      data: kyc
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

exports.updateKyc = async (req, res) => {
  try {
    const id = req.params.id;
    const kyc = await KycModel.findByPk(id);
    if (!kyc) return res.status(404).json({ message: 'KYC not found' });

    const updateData = { ...req.body };

    if (req.files?.governmentId)
      updateData.governmentIdFile = req.files.governmentId[0].buffer;
    if (req.files?.proofOfAddress)
      updateData.proofOfAddressFile = req.files.proofOfAddress[0].buffer;

    const updated = await kyc.update(updateData);

    res.status(200).json({
      message: 'KYC updated successfully',
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

exports.deleteKyc = async (req, res) => {
  try {
    const id = req.params.id;
    const kyc = await KycModel.findByPk(id);
    if (!kyc) return res.status(404).json({ message: 'KYC not found' });

    await kyc.destroy();
    res.status(200).json({ message: 'KYC deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

exports.getGovernmentIdFile = async (req, res) => {
  try {
    const kyc = await KycModel.findByPk(req.params.id);
    if (!kyc || !kyc.governmentIdFile) return res.status(404).send('File not found');

    res.set('Content-Type', 'image/jpeg');
    res.send(kyc.governmentIdFile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
