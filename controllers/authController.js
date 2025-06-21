const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, teaches, learns } = req.body;
    const user = new User({ 
      name, 
      email, 
      password, 
      teaches: teaches.split(',').map(skill => skill.trim()), 
      learns: learns.split(',').map(skill => skill.trim()) 
    });
    await user.save();
    req.session.userId = user._id;
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    
    req.session.userId = user._id;
    res.json({ message: 'Logged in successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
};