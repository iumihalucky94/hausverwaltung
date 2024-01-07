const express = require('express')

const app = express()
const port = 3001

app.all('/', (req, res) => {
    console.log(req)
    res.send('Works')
})


app.listen(port, () => {
    console.log('Server works on 3001')
})