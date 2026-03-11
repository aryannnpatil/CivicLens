/**
 * backup/schema/issueSchema.js
 *
 * Reference copy of the Issue Mongoose schema.
 * This is the SOURCE OF TRUTH for the Issue document shape.
 * Use this during DB migrations or when onboarding new members.
 *
 * Fields:
 *  title          — Short headline of the issue
 *  description    — Detailed description
 *  category       — Civic category (road, water, electricity, sanitation, other)
 *  status         — Lifecycle state (open → in_progress → resolved | rejected)
 *  location       — GeoJSON Point [lng, lat]
 *  address        — Human-readable address string
 *  mediaUrls      — Array of Azure Blob Storage public URLs
 *  reportedBy     — User ObjectId ref
 *  assignedTo     — Admin/official ObjectId ref
 *  ward           — Municipal ward identifier
 *  upvotes        — Number of citizens who upvoted
 *  aiLabel        — Classification returned by the Flask AI service
 *  aiConfidence   — Model confidence score (0–1)
 *  resolutionNote — Text note added when status → resolved
 *  timestamps     — createdAt, updatedAt (auto-managed by Mongoose)
 */

const issueSchemaDefinition = {
  title:          { type: 'String',  required: true,  trim: true,   maxlength: 120 },
  description:    { type: 'String',  required: true,  maxlength: 2000 },
  category:       { type: 'String',  enum: ['road', 'water', 'electricity', 'sanitation', 'other'], default: 'other' },
  status:         { type: 'String',  enum: ['open', 'in_progress', 'resolved', 'rejected'], default: 'open' },
  location: {
    type:         { type: 'String',  default: 'Point' },
    coordinates:  { type: '[Number]', required: true }, // [lng, lat]
  },
  address:        { type: 'String' },
  mediaUrls:      [{ type: 'String' }],
  reportedBy:     { type: 'ObjectId', ref: 'User', required: true },
  assignedTo:     { type: 'ObjectId', ref: 'User' },
  ward:           { type: 'String' },
  upvotes:        { type: 'Number',  default: 0 },
  aiLabel:        { type: 'String' },
  aiConfidence:   { type: 'Number',  min: 0, max: 1 },
  resolutionNote: { type: 'String' },
};

// Indexes: location (2dsphere), status, category, reportedBy

module.exports = { issueSchemaDefinition };
