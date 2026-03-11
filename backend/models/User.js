const mongoose = require('mongoose');

/**
 * User model — placeholder schema.
 */
const userSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }, // bcrypt hashed
    role:     { type: String, enum: ['citizen', 'admin'], default: 'citizen' },
    phone:    { type: String },
    ward:     { type: String }, // civic ward/area
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
