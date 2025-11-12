const fs = require('fs');
const cloudinary = require('../config/cloudinary');
const KycModel = require('../models/kyc-investor');
const KycModelU = require('../models/kyc-businessOwner');
const investorModel = require('../models/investor');
const userModel = require('../models/user')

exports.createKycI = async (req, res) => {
  try {
    const userId = req.user.id;
    const govFile = req.files?.governmentId?.[0]
    const proofFile = req.files?.proofOfAddress?.[0]
    const proPic = req.files?.profilePic?.[0];
    const existingKyc = await KycModel.findOne({ where: { userId:userId } });
    
    if (existingKyc) {
      fs.unlinkSync(govFile.path);
      fs.unlinkSync(proofFile.path);
      fs.unlinkSync(proPic.path);
      return res.status(400).json({ message: 'KYC already exists for this user' });
    }

    const {
      profilePic,
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
      governmentId,
      proofOfAddress
    } = req.body;
    
    let file
      file = govFile
      const resultG = await cloudinary.uploader.upload(file.path, {resource_type: "auto"});
      fs.unlinkSync(govFile.path);
    
      file = proofFile
      const resultP = await cloudinary.uploader.upload(file.path, {resource_type: "auto"});
      fs.unlinkSync(proofFile.path);

      file = proPic
      const resultPP = await cloudinary.uploader.upload(file.path, {resource_type: "auto"});
      fs.unlinkSync(proPic.path);
    

    const newKyc = new KycModel({
      profilePic:resultPP.secure_url,
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
      governmentIdUrl: resultG.secure_url,
      proofOfAddressUrl: resultP.secure_url,
      governmentIdPublicId:resultG.public_id,
      proofOfAddressPublicId:resultP.public_id,
      profilePicPublicId:resultPP.public_id
    });
    await newKyc.save()
    await investorModel.update({kycStatus:'under review'},{where:{id:userId}})

    res.status(201).json({
      message: 'KYC created successfully',
      data: newKyc
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error from the controller',
      error: error.message
    });
  }
};
exports.getAllKycs = async (req, res) => {
  try {
    const kycs = await KycModel.findAll();

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

exports.getKycByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findByPk(id)
    const investor = await investorModel.findByPk(id)
    if(!investor && user){
      const kyc = await KycModelU.findOne({where:{userId:id}});
      if (!kyc) {
      return res.status(404).json({ message: 'KYC not found' });
      }
      res.status(200).json({
      message: 'User KYC found',
      data: kyc
      });
    }else if(!user && investor){
      const kyc = await KycModel.findOne({where:{userId:id}});
      if (!kyc) {
      return res.status(404).json({ message: 'KYC not found' });
      }
      res.status(200).json({
      message: 'investor KYC found',
      data: kyc
      });
    }else{
      res.status(404).json({
      message: 'User not found'
      });
    }
    
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
    if (req.files?.governmentId?.[0]) {
      const govFile = req.files.governmentId[0];
      const result = await cloudinary.uploader.upload(govFile.path, {
        folder: 'kyc_documents'
      });
      updateData.governmentIdUrl = result.secure_url;
      fs.unlinkSync(govFile.path);
    }
    if (req.files?.proofOfAddress?.[0]) {
      const proofFile = req.files.proofOfAddress[0];
      const result = await cloudinary.uploader.upload(proofFile.path, {
        folder: 'kyc_documents'
      });
      updateData.proofOfAddressUrl = result.secure_url;
      fs.unlinkSync(proofFile.path);
    }

    const updated = await kyc.update(updateData);

    res.status(200).json({
      message: 'KYC updated successfully',
      data: updated
    });
  } catch (error) {
    console.error(error);
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
