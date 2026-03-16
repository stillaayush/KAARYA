const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
    // Basic Info
    companyName: { type: String, required: true },
    contactName: { type: String, required: true },
    phone: { type: String, required: true, unique: true }, // OTP Login
    
    // Verification & Trust
    isVerified: { type: Boolean, default: false }, // "Verified Employer" badge
    gstNumber: { type: String }, // Optional for tax/business verification
    
    // Location & Hiring Info
    headquarters: { type: String, required: true },
    totalWorkersHired: { type: Number, default: 0 }, // For their stats dashboard
    
    // Links to other data
    jobsPosted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    workerRatings: [{
        workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' },
        rating: { type: Number, min: 1, max: 5 },
        review: { type: String }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Employer', employerSchema);