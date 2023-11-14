const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql');

const app = express();
const PORT = 63333;

const dbConfig = {
  host: 'localhost',
  user: 'hv',
  password: '.k(Wy3=PZ9q36n?fZv',
  database: 'hausverwaltung'
};

const generateHTML = (text, info) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HV - Information</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<style>
    body {
      background-color: #f8f9fa; /* Gray background color */
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    form {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  </style>
</head>
<body>
  <div class="container mt-5">
    <div class="alert alert-info" role="alert">
  <h4 class="alert-heading">Information</h4>
  <p>${text}</p>
  <hr>
  <p class="mb-0">${info}</p>
</div>
  </div>
</body>
</html>
`;

function isValidDatetime(datetime) {
    // Use a regular expression to match a valid datetime format
    const datetimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    return datetimeRegex.test(datetime);
  }
  
  function isValidName(name) {
    // Use a regular expression to allow only alphanumeric characters and underscores
    const nameRegex = /^[a-zA-Z0-9_]+$/;
    return nameRegex.test(name);
  }

const connection = mysql.createConnection(dbConfig);

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  }));
  

app.get('/:taskId', (req, res) => {
  const taskId = req.params.taskId + '==';
  const decodedTaskId = Buffer.from(taskId, 'base64').toString('utf-8');
  console.log(req.params.taskId , decodedTaskId)
  
  
  if (decodedTaskId.includes(',')) {
    const [datetime, name] = decodedTaskId.split(',');

    if (!isValidDatetime(datetime) && !isValidName(name)) {
        return res.status(500).send(generateHTML('Invalid request!', 'Fehlercode: -1'));
      }

    // Check if the entry exists in the database
    const sql = 'SELECT * FROM tasks WHERE date_created = "'+datetime+'" AND name = "'+name+'"';

    connection.query(sql, (error, results) => {
      if (error) {
        return res.status(500).send(generateHTML('Error checking task availability!', 'Fehlercode: 0'));
      }

      console.log(results)

      if (results.length > 0 && results[0].status !== 'done') {
        //res.sendFile(path.join(__dirname, 'upload-form.html'));
        const html = fs.readFileSync(path.join(__dirname, 'upload-form.html'), 'utf8').replace(':taskId', taskId);
        res.send(html);
      } else {
        res.send(generateHTML('Hochladen ist nicht mehr möglich, bitte wenden Sie sich an die Hausverwaltung!', 'Fehlercode: 1'));
      }
    });
  } else {
    res.send(generateHTML('Bitte wenden Sie sich an die Hausverwaltung!', 'Fehlercode: 2'));
  }
});

app.post('/:taskId/upload', (req, res) => {
  const taskId = req.params.taskId + '==';
  const decodedTaskId = Buffer.from(taskId, 'base64').toString('utf-8');
  
  if (decodedTaskId.includes(',')) {
    const [datetime, name] = decodedTaskId.split(',');

    if (!isValidDatetime(datetime) && !isValidName(name)) {
        return res.status(500).send(generateHTML('Invalid request!', 'Fehlercode: -2'));
      }

    // Create a unique folder name using UUID
    const folderName = uuidv4();

    // Update the status to 'done' after uploading
    const updateSql = 'UPDATE tasks SET status = ?, report = ? WHERE date_created = ? AND name = ?';
    const updateValues = ['done', folderName, datetime, name];

    connection.query(updateSql, updateValues, (updateError, updateResults) => {
      if (updateError) {
        return res.status(500).send(generateHTML('Bitte wenden Sie sich an die Hausverwaltung!', 'Fehlercode: 3'));
      }
    });

    const uploadPath = path.join('/home/hv/hausverwaltung/backend/task-upload', folderName);

    fs.mkdirSync(uploadPath);

    // Process each uploaded file
    for (let fileKey in req.files) {
        const file = req.files[fileKey];
        const fileName = file.name;
        const filePath = path.join(uploadPath, fileName);

        if (file.size > 50 * 1024 * 1024) {
            return res.status(400).send(generateHTML('Die Dateien müssen weniger als 50 MG sein!', 'Upload size exceeded!'));
          }

        file.mv(filePath, (err) => {
        if (err) {
            return res.status(500).send(generateHTML(err, 'Internal error!'));
        }
        });
    }

    res.send(generateHTML('Die Dateien wurden erfolgreich hochgeladen!', 'Vielen Dank, die Hausverwaltung wurde informiert!'));
  } else {
    res.send(generateHTML('Bitte wenden Sie sich an die Hausverwaltung!', 'Fehlercode: 4'));
  }
});

app.listen(PORT, () => {
  console.log(`Upload-Server is running on http://immg.tech:${PORT}`);
});
