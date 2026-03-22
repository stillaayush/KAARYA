const express = require('express');
const path = require('path');
const app = express();

// This ensures your CSS and Images load correctly
app.use(express.static(__dirname));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/worker-register', (req, res) => res.sendFile(path.join(__dirname, 'worker-register.html')));

app.listen(3000, () => console.log('🚀 Kaarya Live at http://localhost:3000'));