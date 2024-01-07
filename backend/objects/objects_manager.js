const express = require('express');

// Initialize the server
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Handle requests on /object/create/service
app.all('/', (req, res) => {
    // Extract the data received in the request
    const receivedData = req.body;

    // Log or process the received data
    console.log('Received data:', receivedData);

    // Send a response back
    res.status(200).json({ message: 'Object creation processed', receivedData });
});

app.use((req, res, next) => {
    console.log('Received request on port 3001'); // Log when a request is received
    next();
});

// Define the server's port and start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Object Service Server running on port: ${PORT}`);
});
