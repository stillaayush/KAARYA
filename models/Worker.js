const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
    // Basic Info
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true }, // Used for OTP login
    idProofUrl: { type: String }, // Link to their uploaded ID document
    
    // Professional Details
    skills: [{ 
        type: String, 
        enum: ['Mason', 'Electrician', 'Plumber', 'Painter', 'Driver', 'Factory worker', 'Construction helper'] 
    }],
    experienceYears: { type: Number, required: true },
    expectedDailyWage: { type: Number, required: true },
    location: { type: String, required: true }, // Later, we can upgrade this to GeoJSON for map tracking
    
    // Core Kaarya Features
    isAvailable: { type: Boolean, default: true }, // The ON/OFF Availability Toggle
    emergencyMode: { type: Boolean, default: false }, // "Need Work Today" feature
    
    // Trust & Verification System
    kaaryaScore: { type: Number, default: 0 }, // Overall reputation score
    employerRatings: [{
        employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer' },
        rating: { type: Number, min: 1, max: 5 },
        review: { type: String }
    }],
    skillBadges: [{ type: String }], // e.g., "Verified Electrician", "Safety Passed"
    
    // Financials
    paymentHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }]
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt'

module.exports = mongoose.model('Worker', workerSchema);