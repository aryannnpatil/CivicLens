/**
 * backup/seeds/sampleIssues.js
 *
 * Sample seed data for development and QA testing.
 * Run with: node backup/seeds/seed.js
 *
 * Covers all categories and statuses to exercise UI states.
 */

const sampleIssues = [
  {
    title: 'Pothole on MG Road near bus stop #12',
    description:
      'Large pothole approximately 2 feet wide causing accidents for two-wheelers. Needs urgent repair.',
    category: 'road',
    status: 'open',
    location: { type: 'Point', coordinates: [77.5946, 12.9716] }, // Bengaluru
    address: 'MG Road, near Bus Stop 12, Bengaluru, Karnataka 560001',
    ward: 'Ward 76',
    upvotes: 14,
    aiLabel: 'road',
    aiConfidence: 0.94,
  },
  {
    title: 'Broken water main flooding street',
    description:
      'Underground water pipe burst at the intersection of 5th Cross and 8th Main. Standing water for 3 days.',
    category: 'water',
    status: 'in_progress',
    location: { type: 'Point', coordinates: [77.5847, 12.9352] },
    address: '5th Cross, 8th Main, Jayanagar, Bengaluru 560041',
    ward: 'Ward 63',
    upvotes: 31,
    aiLabel: 'water',
    aiConfidence: 0.97,
  },
  {
    title: 'Street lights non-functional for 2 weeks',
    description:
      'Entire stretch of Koramangala 4th Block main road is dark after 7 PM. Safety concern.',
    category: 'electricity',
    status: 'resolved',
    location: { type: 'Point', coordinates: [77.6245, 12.9352] },
    address: 'Koramangala 4th Block, Bengaluru 560034',
    ward: 'Ward 68',
    upvotes: 22,
    aiLabel: 'electricity',
    aiConfidence: 0.91,
    resolutionNote: 'BESCOM replaced faulty transformer on 10-Mar-2026.',
  },
  {
    title: 'Garbage not collected for 5 days',
    description:
      'BBMP garbage vehicle has not visited Sector 7, HSR Layout for 5 consecutive days.',
    category: 'sanitation',
    status: 'open',
    location: { type: 'Point', coordinates: [77.6408, 12.9116] },
    address: 'HSR Layout, Sector 7, Bengaluru 560102',
    ward: 'Ward 174',
    upvotes: 8,
    aiLabel: 'sanitation',
    aiConfidence: 0.88,
  },
  {
    title: 'Tree fallen blocking entire road',
    description:
      'Large rain tree fell across Residency Road due to last night\'s storm. Traffic completely blocked.',
    category: 'other',
    status: 'in_progress',
    location: { type: 'Point', coordinates: [77.6009, 12.9719] },
    address: 'Residency Road, near Trinity Circle, Bengaluru 560025',
    ward: 'Ward 83',
    upvotes: 45,
    aiLabel: 'other',
    aiConfidence: 0.79,
  },
];

module.exports = sampleIssues;
