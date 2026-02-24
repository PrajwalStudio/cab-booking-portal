const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  return password && password.length >= 6;
};

const isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[\d\s-()]{10,15}$/;
  return phoneRegex.test(phone);
};

const validateRegistration = (req, res, next) => {
  const { name, email, password, role, phone } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!email || !isValidEmail(email)) {
    errors.push('Please provide a valid email address');
  }

  if (!password || !isValidPassword(password)) {
    errors.push('Password must be at least 6 characters long');
  }

  if (!role || !['company', 'vendor'].includes(role)) {
    errors.push('Role must be either "company" or "vendor"');
  }

  if (phone && !isValidPhone(phone)) {
    errors.push('Please provide a valid phone number');
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      message: 'Validation failed', 
      errors 
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !isValidEmail(email)) {
    errors.push('Please provide a valid email address');
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      message: 'Validation failed', 
      errors 
    });
  }

  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  isValidEmail,
  isValidPassword,
  isValidPhone
};