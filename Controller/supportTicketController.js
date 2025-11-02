const supportTicketModel = require('../models/supportticket');




exports.createTicket = async (req, res) => {
  try {
    const { id } = req.user; // from login token
    const { businessId, title, description } = req.body;

   
    if (!businessId || !title || !description) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

   
    const ticket = await supportTicketModel.create({
      userId: id,
      businessId,
      title,
      description,
      ticketStatus: 'open'
    });

    res.status(201).json({
      message: 'Support ticket created successfully',
      data: ticket
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating ticket', error: error.message });
  }
};


exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await supportTicketModel.findAll();
    res.status(200).json({ data: tickets });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error: error.message });
  }
};


exports.getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await supportTicketModel.findByPk(id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not Available' });
    }

    res.status(200).json({ data: ticket });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ticket', error: error.message });
  }
};


exports.updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, ticketStatus } = req.body;

    const ticket = await supportTicketModel.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not Available' });
    }

    await ticket.update({ title, description, ticketStatus });
    res.status(200).json({
      message: 'Ticket updated successfully',
      data: ticket
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating ticket', error: error.message });
  }
};


exports.deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await supportTicketModel.findByPk(id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not Available' });
    }

    await ticket.destroy();
    res.status(200).json({ message: 'ticket trashed go and buy another one' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ticket', error: error.message });
  }
};