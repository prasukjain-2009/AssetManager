const UI = require('./UI')
const API = require('./Server')
const express = require('express');
const bodyParser = require('body-parser');// initialize our express app
const app = express();
let port = 8080;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
  
app.use('/api' ,API)
app.use('/',UI)
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});