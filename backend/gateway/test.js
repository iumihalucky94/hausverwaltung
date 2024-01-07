const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express()
const port = 3000

app.use('/api/object/create', createProxyMiddleware({
    target: 'http://127.0.0.1:3001',
    pathRewrite: {
        '^/api/object/create': '/',
    }
}))


app.listen(port, () => {
    console.log('Server port 3000')
})