const express = require('express');
var fs = require('fs');
const path = require('path')

const router = express.Router();
// Require the controllers WHICH WE DID NOT CREATE YET!!
let index = path.resolve('UI/index.html')


// a simple test url to check that all of our files are communicating correctly.
router.get('', (req,res)=>res.sendFile(index));
module.exports = router;