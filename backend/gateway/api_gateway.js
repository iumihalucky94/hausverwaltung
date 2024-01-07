const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const logging_actions = require('../tools/logger.js');

// Initialize Server
const app = express();
// const apiRouter = express.Router();

// Proxy middleware configuration
// const objectServiceProxy = createProxyMiddleware({
//     target: 'http://127.0.0.1:3001',
//     pathRewrite: {
//         '^/api/object/create': '/',
//         '^/object/create': '/',
//     }
// });

// Middleware to parse JSON
app.use(express.json());

// Error handling for the proxy
app.use((err, req, res, next) => {
    if (err) {
        console.error('Proxy error:', err);
        res.status(500).send('Internal Server Error');
    } else {
        next();
    }
});

// Proxy middleware usage
app.use('/api/object/create', createProxyMiddleware({
    target: 'http://127.0.0.1:3001',
    pathRewrite: {
        '^/api/object/create': '/',
        '^/object/create': '/',
    }
}));

app.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl); // Log the request URL
    next();
});
// Mount the router
app.use('/api', apiRouter);




// Define the server's port and start the server
const PORT = 3000;
app.listen(PORT, (err) => {
    if (err) return console.log('Error starting server:', err);
    console.log('Server running on port:', PORT);
});



// Use authentication middleware
// apiRouter.use(authenticationMiddleware);








// // Authentication Middleware (placeholder for actual implementation)
// const authenticationMiddleware = (req, res, next) => {
//     // Implement your authentication logic here
//     // For now, it's just allowing all requests
//     next();
// };

// // Enhanced Logging Middleware
// app.use((req, res, next) => {
//     console.log(`Received request: ${req.method} ${req.url}`);
//     // Store the original send function
//     const originalSend = res.send;

//     res.send = function (data) {
//         // Log the response data
//         let a = logging_actions('user', 'Response', data, req.url, 'server response');
//         console.log(a)
//         res.send = originalSend; // set function back to avoid the 'double-send'
//         return originalSend.apply(res, arguments);
//     };

//     next();
// });