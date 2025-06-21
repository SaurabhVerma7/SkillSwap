const User = require('../models/User');

exports.getCurrentUser = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: 'Not authenticated' });
    const user = await User.findById(req.session.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { skill } = req.query;
    const users = await User.find({ teaches: skill }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};