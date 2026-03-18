const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); 

mongoose.connect('mongodb://127.0.0.1:27017/kaarya_database')
    .then(() => console.log('✅ Kaarya DB Connected'))
    .catch(err => console.log('❌ DB Error:', err.message));

app.listen(3000, () => {
    console.log('🚀 Server active at http://localhost:3000');
});