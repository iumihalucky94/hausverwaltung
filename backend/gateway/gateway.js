const express = require('express');
const app = express();
const port = 3000; // Вы можете выбрать любой порт

app.use(express.json());

// Здесь будут роуты для перенаправления запросов

app.listen(port, () => {
    console.log(`Gateway listening at http://localhost:${port}`);
});
