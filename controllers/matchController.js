const User = require('../models/User');

exports.findMatches = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: 'Not authenticated' });
    
    const currentUser = await User.findById(req.session.userId);
    const allUsers = await User.find({ _id: { $ne: currentUser._id } }).select('-password');
    
    const matches = allUsers.filter(user => {
      const userCanTeachCurrent = user.teaches.some(skill => currentUser.learns.includes(skill));
      const currentCanTeachUser = currentUser.teaches.some(skill => user.learns.includes(skill));
      return userCanTeachCurrent && currentCanTeachUser;
    });
    
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};