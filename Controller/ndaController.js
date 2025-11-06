const NdaAgreement = require('../models/Nda')
const investorModel = require('../models/investor');

exports.createNda = async (req, res) => {
  try {
    const userId = req.user.id;
    const { agreementText, agreed } = req.body;

    const existingNda = await NdaAgreement.findOne({ where: { userId } });
    if (existingNda) {
      return res.status(400).json({ message: 'NDA already exists for this user' });
    }

    const newNda = await NdaAgreement.create({
      userId,
      agreementText,
      agreed: agreed || false,
      signedAt: agreed ? new Date() : null
    });

    //Update investor model NDA status
    if (agreed) {
      await investorModel.update({ ndaStatus: 'signed' }, { where: { id: userId } });
    }

    res.status(201).json({
      message: 'NDA Agreement created successfully',
      data: newNda
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

exports.getAllNdas = async (req, res) => {
  try {
    const ndas = await NdaAgreement.findAll();
    res.status(200).json({
      message: 'All NDA agreements fetched successfully',
      count: ndas.length,
      data: ndas
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

exports.getNdaByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const nda = await NdaAgreement.findOne({ where: { userId } });

    if (!nda) {
      return res.status(404).json({ message: 'NDA not found for this user' });
    }

    res.status(200).json({
      message: 'NDA found',
      data: nda
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

exports.updateNda = async (req, res) => {
  try {
    const { id } = req.params;
    const nda = await NdaAgreement.findByPk(id);
    if (!nda) return res.status(404).json({ message: 'NDA not found' });

    const { agreementText, agreed } = req.body;

    const updateData = {
      agreementText: agreementText || nda.agreementText,
      agreed: agreed !== undefined ? agreed : nda.agreed,
      signedAt: agreed ? new Date() : nda.signedAt
    };

    const updatedNda = await nda.update(updateData);

    if (agreed) {
      await investorModel.update({ ndaStatus: 'signed' }, { where: { id: nda.userId } });
    }

    res.status(200).json({
      message: 'NDA updated successfully',
      data: updatedNda
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

exports.deleteNda = async (req, res) => {
  try {
    const { id } = req.params;
    const nda = await NdaAgreement.findByPk(id);
    if (!nda) return res.status(404).json({ message: 'NDA not found' });

    await nda.destroy();

    res.status(200).json({
      message: 'NDA deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};
