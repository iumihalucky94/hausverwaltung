const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express()
const port = 3000

app.use(express.json());
const apiRouter = express.Router();

app.use('/api/object/create', createProxyMiddleware({
    target: 'http://127.0.0.1:3001',
    pathRewrite: {
        '^/api/object/create': '/',
        '^/object/create': '/',
    }
}));

app.listen(port, (err) => {
    if (err) return console.log('Error starting server:', err);
    console.log('Server running on port:', port);
});