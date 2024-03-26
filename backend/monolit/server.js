require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Custom imports 
const {
    insertIntoSuppliers,
    checkEmailExists,
    getAllSuppliers,
    insertObject,
    getAllObjects,
    updateObject,
    getObjectByID,
    deleteObecject,
    createGroupTask,
    listGroups,
    list_tasks_groups,
    createMandant,
    listMandant,
    changeMandantStatus
} = require('./db');

// Middleware
app.use(bodyParser.json());

// CORS options
const corsOptions = {
    // origin: 'http://localhost:5173', // For Development version
    origin: 'http://localhost:61389', // For Build version
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// <=============== SUPPLIER ===============>
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
        let response = await getAllSuppliers();
        res.status(200).send({ success: response.success, message: response.message });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// <=============== SUPPLIER END ===============>

// <=============== OBJECTS ===============>
app.post('/objects/create', async (req, res) => {
    try {
        let createObjectJSON = req.body
        let result = await insertObject(createObjectJSON);
        res.status(201).send({ success: result.success, message: result.message });
    } catch (e) {
        console.log(e)
        res.status(400).send({ error: e.message });
    }
})

app.put('/objects/update', async (req, res) => {
    try {
        let updateDataJSON = req.body
        let result = await updateObject(updateDataJSON)
        if (result.affectedRows === 1) {
            res.status(200).send({ success: true, message: 'Record has been updated successfully' })
        } else {
            res.status(400).send({ success: false, message: 'Something went wrong!' })
        }
    } catch (error) {
        res.status(400).send({ success: false, message: error })
    }
})

app.get('/objects/get_data/:objectId', async (req, res) => {
    try {
        const objectId = req.params.objectId;
        let objectRes = await getObjectByID(objectId)
        if (Object.keys(objectRes).length > 0) {
            res.status(200).send({ success: true, message: objectRes })
        } else {
            res.status(400).send({ success: false, message: objectRes })
        }
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

app.post('/objects/delete/', async (req, res) => {
    try {
        if (req.body.toBeDeleted) {
            let objectRes = await deleteObecject(req.body.object_id)
            res.status(200).send({ success: true, message: `${objectRes} Row(s) has been deleted.` })
        } else {
            res.status(400).send({ success: false, error: `${objectRes} || Something went wrong.` })
        }

    } catch (error) {
        res.status(400).send({ success: false, error: error.message })
    }
})

app.get('/objects/list', async (req, res) => {
    try {
        let jsonData = await getAllObjects();
        console.log(jsonData)
        res.status(200).send({ success: true, jsonData: jsonData })
    } catch (error) {
        res.status(400).send({ success: false, error: error.message })
    }
})

// <=============== OBJECTS ===============>

// <=============== TASKS & GROUPS ===============>

app.post('/tg/create_gt', async (req, res) => {
    try {
        let tgJSON = req.body
        if (tgJSON.gt === 'Groups') {
            let response = await createGroupTask(tgJSON)
            if (response.success) {
                let affectedRowsNum = parseInt(response.message.affectedRows)
                res.status(200).send({ success: true, message: `${affectedRowsNum} New group created` })
            } else {
                res.status(422).send({ success: response.success, message: response.message })
            }
        } else if (tgJSON.gt === 'Tasks') {
            let response = await createGroupTask(tgJSON)
            if (response.success) {
                let affectedRowsNum = parseInt(response.message.affectedRows)
                res.status(200).send({ success: true, message: `${affectedRowsNum} New Task created` })
            } else {
                res.status(422).send({ success: response.success, message: response.message })
            }
        } else {
            res.status(400).send({ success: false, error: 'Group or Task parameter is wrong' })
        }
    } catch (error) {
        res.status(400).send({ success: false, error: error.message })
    }
})

app.get('/tg/list_groups', async (req, res) => {
    try {
        let response = await listGroups();
        if (response.success) {
            res.status(200).send({ success: true, message: response.message })
        } else {
            console.log(response)
            res.status(422).send({ success: response.success, message: response.message })
        }
    } catch (error) {
        res.status(400).send({ success: false, error: error.message })
    }
})

app.get('/tg/list', async (req, res) => {
    try {
        let response = await list_tasks_groups()
        res.status(200).send({ success: true, message: response.message })
    } catch (error) {
        res.status(400).send({ success: false, error: error.message })
    }
})

// <=============== TASKS & GROUPS END ===============>

// <=============== MANDANT ===============>

app.post('/mandant/create', async (req, res) => {
    try {
        let response = await createMandant(req.body)
        res.status(200).send({ success: response.success, message: response.message })
        // res.status(200).send({ success: true, message: response.message })
    } catch (error) {
        res.status(400).send({ success: false, error: error.message })
    }
})

app.get('/mandant/list/:object_id', async (req, res) => {
    try {
        let response = await listMandant(req.params)
        res.status(200).send({ success: response.success, message: response.message })
    } catch (error) {
        res.status(400).send({ success: false, error: error.message })
    }
})

app.post('/mandant/change_status', async (req, res) => {
    try {
        let response = await changeMandantStatus(req.body)
        // res.status(200).send('OK')
        res.status(200).send({ success: response.success, message: response.message, value: response.value })
    } catch (error) {
        console.log(error)
        res.status(400).send({ success: false, error: error.message })
    }
})


// Start the server
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});