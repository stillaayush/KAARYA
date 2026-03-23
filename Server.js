const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname));
app.use(express.json());

// Main Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/worker-register', (req, res) => res.sendFile(path.join(__dirname, 'worker-register.html')));
app.get('/employer-register', (req, res) => res.sendFile(path.join(__dirname, 'employer-register.html')));

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 KAARYA SYSTEM LIVE: http://localhost:${PORT}`));