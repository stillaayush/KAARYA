const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import our Database Models (These link to the 'models' folder you created)
const Worker = require('./models/Worker');
const Job = require('./models/Job');
const Employer = require('./models/Employer');

const app = express();
const PORT = 3000;

// --- 1. MIDDLEWARE ---
app.use(cors());
app.use(express.json()); // Allows the server to understand JSON data from the frontend
app.use(express.static(__dirname)); // Tells the server to show your HTML/CSS files

// --- 2. DATABASE CONNECTION ---
mongoose.connect('mongodb://127.0.0.1:27017/kaarya_database')
    .then(() => console.log('✅ Successfully connected to MongoDB Database!'))
    .catch((err) => {
        console.log('❌ MongoDB Connection Error. Is MongoDB running on your PC?');
        console.log('Error details:', err.message);
    });

// --- 3. API ROUTES (THE BRAIN) ---

// Route A: Register a Worker
app.post('/api/register-worker', async (req, res) => {
    try {
        const newWorker = new Worker(req.body);
        await newWorker.save();
        
        console.log(`👷 New Worker Registered: ${newWorker.name} (${newWorker.skills[0]})`);
        res.status(201).json({ message: "Worker registered successfully!" });
    } catch (error) {
        console.error("Worker Registration Error:", error);
        res.status(400).json({ error: "Failed to register worker. Please check the form." });
    }
});

// Route B: Register an Employer
app.post('/api/register-employer', async (req, res) => {
    try {
        const newEmployer = new Employer(req.body);
        await newEmployer.save();
        
        console.log(`🏢 New Employer Registered: ${newEmployer.companyName}`);
        res.status(201).json({ message: "Employer registered successfully!", employerId: newEmployer._id });
    } catch (error) {
        console.error("Employer Registration Error:", error);
        res.status(400).json({ error: "Failed to register employer." });
    }
});

// Route C: Post a Job (From Employer Dashboard)
app.post('/api/post-job', async (req, res) => {
    try {
        const newJob = new Job(req.body);
        await newJob.save();
        
        console.log(`📋 New Job Posted: ${newJob.title} for ₹${newJob.dailyWage}/day`);
        res.status(201).json({ message: "Job posted successfully!" });
    } catch (error) {
        console.error("Job Posting Error:", error);
        res.status(400).json({ error: "Failed to post job." });
    }
});

// Route D: Get All Available Workers (For Employer Dashboard)
app.get('/api/workers', async (req, res) => {
    try {
        // Fetches all available workers and sorts them by newest first
        const workers = await Worker.find({ isAvailable: true }).sort({ createdAt: -1 });
        res.json(workers);
    } catch (error) {
        console.error("Fetch Workers Error:", error);
        res.status(500).json({ error: "Failed to fetch workers." });
    }
});

// Route E: Get All Open Jobs (For Worker Dashboard)
app.get('/api/jobs', async (req, res) => {
    try {
        // Fetches open jobs, sorts by newest, and cleverly pulls the Employer's Company Name
        const jobs = await Job.find({ status: 'Open' })
                              .populate('employerId', 'companyName')
                              .sort({ createdAt: -1 }); 
        res.json(jobs);
    } catch (error) {
        console.error("Fetch Jobs Error:", error);
        res.status(500).json({ error: "Failed to fetch jobs." });
    }
});

// --- 4. START THE SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Kaarya Server is running perfectly on http://localhost:${PORT}`);
    console.log(`👉 Open your browser to view the site!`);
});