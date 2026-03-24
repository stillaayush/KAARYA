const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static(__dirname)); // This serves your HTML, CSS, and JS files
app.use(express.json());

// API: This sends the jobs from jobs.json to your website
app.get('/api/jobs', (req, res) => {
    fs.readFile('./jobs.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send("Database Error");
        res.json(JSON.parse(data));
    });
});

// API: This allows employers to post new jobs to the feed
app.post('/api/post-job', (req, res) => {
    const newJob = { id: Date.now(), ...req.body };
    fs.readFile('./jobs.json', 'utf8', (err, data) => {
        const jobs = JSON.parse(data || '[]');
        jobs.unshift(newJob); // Puts the newest job at the top
        fs.writeFile('./jobs.json', JSON.stringify(jobs, null, 2), () => {
            res.json({ success: true });
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 KAARYA LIVE: http://localhost:${PORT}`));