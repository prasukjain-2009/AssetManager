const express = require('express');
var fs = require('fs');

const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!var index = fs.readFileSync('index.html');


// a simple test url to check that all of our files are communicating correctly.
router.get('/', (req,res)=>{
    res.send('hello')
});
module.exports = router;