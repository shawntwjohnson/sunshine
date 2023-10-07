const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 8080;

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI;

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

// Serve static files
app.use(express.static(path.join(__dirname, '.')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'logger.html'));
});

app.get('/calculator', (req, res) => {
    res.sendFile(path.join(__dirname, 'calculator.html'));
});

// Mongoose schema and model
const jobLogSchema = new mongoose.Schema({
    jobNumber: String,
    totalLights: String,
    lightType: String
});
const JobLog = mongoose.model('JobLog', jobLogSchema);

// Endpoints
app.post('/log-job', async (req, res) => {
    try {
        const jobData = req.body;
        const newJob = new JobLog(jobData);
        await newJob.save();
        res.json({ message: 'Job logged successfully' });
    } catch (error) {
        console.error('Error saving job to database:', error);
        res.status(500).json({ error: 'Failed to save job to database' });
    }
});

app.get('/get-jobs', async (req, res) => {
    try {
        const jobs = await JobLog.find();  // Fetch all job logs from MongoDB
        res.json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
