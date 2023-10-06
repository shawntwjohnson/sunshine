const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

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
