const NdaAgreement = require('../models/Nda');

exports.createNda = async (req, res) => {
  try {
    const { userId, startupName, agreementText } = req.body;

    if (!userId || !startupName || !agreementText) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const nda = await NdaAgreement.create({
      userId,
      startupName,
      agreementText,
      status: 'Pending',
      agreed: false,
      sentDate: new Date(),
    });

    res.status(201).json({
      message: 'NDA created and sent successfully',
      nda,
    });
  } catch (error) {
    console.error('Error creating NDA:', error);
    res.status(500).json({ message: 'Error creating NDA', error: error.message });
  }
};

// 🟡 Sign NDA
exports.signNda = async (req, res) => {
  try {
    const { id } = req.params;
    const nda = await NdaAgreement.findByPk(id);

    if (!nda) return res.status(404).json({ message: 'NDA not found' });

    nda.agreed = true;
    nda.signedDate = new Date();
    nda.status = 'Active';
    nda.expiryDate = new Date(
      nda.signedDate.getFullYear() + 1,
      nda.signedDate.getMonth(),
      nda.signedDate.getDate()
    );

    await nda.save();

    res.status(200).json({
      message: 'NDA signed successfully',
      nda,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error signing NDA', error: error.message });
  }
};

exports.getAllNdas = async (req, res) => {
  try {
    const ndas = await NdaAgreement.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({
      message: 'All NDAs fetched successfully',
      count: ndas.length,
      data: ndas,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching NDAs', error: error.message });
  }
};

exports.getUserNdas = async (req, res) => {
  try {
    const { userId } = req.params;
    const ndas = await NdaAgreement.findAll({ where: { userId } });

    if (!ndas.length) {
      return res.status(404).json({ message: 'No NDA found for this user' });
    }

    res.status(200).json({
      message: 'User NDAs fetched successfully',
      data: ndas,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user NDA', error: error.message });
  }
};

//Admin Update NDA Status
exports.updateNdaStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const nda = await NdaAgreement.findByPk(id);
    if (!nda) return res.status(404).json({ message: 'NDA not found' });

    nda.status = status;
    await nda.save();

    res.status(200).json({
      message: 'NDA status updated successfully',
      nda,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating NDA status', error: error.message });
  }
};

// Auto check for expired NDAs
exports.checkAndExpireNdas = async () => {
  const now = new Date();
  const ndas = await NdaAgreement.findAll({
    where: {
      expiryDate: { [Op.lte]: now },
      status: 'Active',
    },
  });

  for (const nda of ndas) {
    nda.status = 'Expired';
    await nda.save();
  }

  console.log(`${ndas.length} NDAs marked as expired`);
};
