const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const jobLogSchema = new mongoose.Schema({
    jobNumber: String,
    totalLights: String,
    lightType: String
});
const JobLog = mongoose.model('JobLog', jobLogSchema);

app.post('/jobs/log', async (req, res) => {
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

app.get('/jobs/get', async (req, res) => {
    try {
        const jobs = await JobLog.find();
        res.json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.delete('/jobs/delete/:id', async (req, res) => {
    try {
        const jobId = req.params.id;
        await JobLog.findByIdAndDelete(jobId);
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ error: 'Failed to delete job' });
    }
});
