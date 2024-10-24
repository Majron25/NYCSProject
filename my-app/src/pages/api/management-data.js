// pages/api/management-data.js
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if role is either 'admin' or 'manager'
    if (decoded.role !== 'admin' && decoded.role !== 'manager') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Proceed to send admin/manager data
    res.status(200).json({ managementData: 'Some sensitive management data' });
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}
