const mongoose = require('mongoose');

/**
 * Issue model — placeholder schema.
 * Team should define full fields during feature implementation.
 */
const issueSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category:    { type: String }, // e.g. 'road', 'water', 'electricity'
    status:      { type: String, enum: ['open', 'in_progress', 'resolved'], default: 'open' },
    location:    {
      type:        { type: String, default: 'Point' },
      coordinates: { type: [Number] }, // [lng, lat]
    },
    mediaUrls:   [{ type: String }], // Azure Blob URLs
    reportedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    aiLabel:     { type: String }, // classification returned by AI service
    aiConfidence:{ type: Number },
  },
  { timestamps: true }
);

issueSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Issue', issueSchema);
