/**
 * backup/schema/userSchema.js
 *
 * Reference copy of the User Mongoose schema.
 *
 * Fields:
 *  name       — Full display name
 *  email      — Unique, lowercase email (login credential)
 *  password   — bcrypt hash (never store plaintext)
 *  role       — 'citizen' | 'admin' | 'official'
 *  phone      — Optional contact number
 *  ward       — Municipal ward (used to filter relevant issues)
 *  isVerified — Email verification flag
 *  avatarUrl  — Azure Blob URL for profile picture
 *  timestamps — createdAt, updatedAt
 */

const userSchemaDefinition = {
  name:       { type: 'String',  required: true,  trim: true, maxlength: 80 },
  email:      { type: 'String',  required: true,  unique: true, lowercase: true },
  password:   { type: 'String',  required: true },
  role:       { type: 'String',  enum: ['citizen', 'admin', 'official'], default: 'citizen' },
  phone:      { type: 'String',  maxlength: 15 },
  ward:       { type: 'String' },
  isVerified: { type: 'Boolean', default: false },
  avatarUrl:  { type: 'String' },
};

// Indexes: email (unique)

module.exports = { userSchemaDefinition };
