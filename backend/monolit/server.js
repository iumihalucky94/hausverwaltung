require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Custom imports 
const { insertIntoSuppliers, checkEmailExists, getAllSuppliers } = require('./db');

// Middleware
app.use(bodyParser.json());

// CORS options
const corsOptions = {
    origin: 'http://localhost:5173', // This should be the URL of your Vue app
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));



// Route to handle POST requests
app.post('/supplier/create_new', async (req, res) => {
    try {
        console.log('Received data:', req.body);
        // Validate or manipulate your data as necessary before inserting into the database
        const data = req.body; // Assuming req.body has { supplier_name, supplier_email, status }

        // Check if email already exists
        const emailExists = await checkEmailExists(data.supplier_email);
        console.log(emailExists)
        if (emailExists) {
            return res.status(400).send('Email already exists');
        }

        // Call the function to insert data, and await its response
        const success = await insertIntoSuppliers(data);

        if (success) {
            res.status(200).send('Data received and inserted into database');
        } else {
            res.status(500).send('Failed to insert data into database');
        }
    } catch (error) {
        // console.error(error);
        res.status(400).send('Something went wrong');
    }
});

app.get('/supplier/get_list', async (req, res) => {
    try {
        const suppliers = await getAllSuppliers();
        res.json(suppliers);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
