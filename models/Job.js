const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    // Job Details
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true },
    title: { type: String, required: true },
    skillRequired: { type: String, required: true },
    dailyWage: { type: Number, required: true }, // Absolute wage transparency
    
    // Logistics
    location: { type: String, required: true },
    workHours: { type: String, default: "9:00 AM - 6:00 PM" },
    jobDurationDays: { type: Number, required: true },
    workersNeeded: { type: Number, required: true }, // Enables the Mass Hiring logic
    
    // Lifecycle of the Job
    status: { 
        type: String, 
        enum: ['Open', 'In Progress', 'Completed', 'Cancelled'], 
        default: 'Open' 
    },
    
    // Connecting Workers to Jobs
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Worker' }],
    hiredWorkers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Worker' }] // Array allows mass hiring of 50+ workers
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);