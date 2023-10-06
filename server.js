const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// MongoDB connection string
// Replace with your actual connection string from MongoDB Atlas
const MONGODB_URI = 'mongodb+srv://shawntwj:Sunshine1234!@cluster0.7ogqw4g.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname, '.')));

// Serve the logger page as the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'logger.html'));
});

// Serve the calculator page
app.get('/calculator', (req, res) => {
    res.sendFile(path.join(__dirname, 'calculator.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Define the schema for the job logs
const jobLogSchema = new mongoose.Schema({
    jobNumber: String,
    totalLights: String,
    lightType: String
});

// Create a model based on the schema
const JobLog = mongoose.model('JobLog', jobLogSchema);
