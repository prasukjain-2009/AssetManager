const express = require('express');
var fs = require('fs');
const path = require('path')

const router = express.Router();
// Require the controllers WHICH WE DID NOT CREATE YET!!
let index = path.resolve('UI/index.html')
let create = path.resolve('UI/create.html')
let page404 = path.resolve('UI/404.html')


// a simple test url to check that all of our files are communicating correctly.
router.get('/:path.css', (req,res)=>res.sendFile(path.resolve("UI/"+req.params.path+".css")));
router.get('/:path.js', (req,res)=>res.sendFile(path.resolve("UI/"+req.params.path+".js")));
router.get('/', (req,res)=>res.sendFile(index));
router.get('/create', (req,res)=>res.sendFile(create));
router.get('/*', (req,res)=>res.sendFile(page404));
module.exports = router;