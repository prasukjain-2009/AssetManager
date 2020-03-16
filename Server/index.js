

'use strict';

const express = require('express');
const fs = require('fs');
var path = require("path");
const router = express.Router();
// Require the controllers WHICH WE DID NOT CREATE YET!!var index = fs.readFileSync('index.html');


// a simple test url to check that all of our files are communicating correctly.
router.post('/asset', (req,res)=>{
    console.log(req.params);
    console.log(req.body);
    let file = JSON.parse(fs.readFileSync(path.join(__dirname,'assets.json')))
    let tags = JSON.parse(fs.readFileSync(path.join(__dirname,'tags.json'))).tags
    let count = file.count;
    let assets = file.assets;
    assets.push({id:count+1,...req.body})
    for (let index = 0; index < req.body.tag.length; index++) {
        const element = req.body.tag[index];
        if(!tags.includes(element)){
            tags.push(element)
        }   
    }
    count = count +1 
    file ={
        assets,
        count
    }
    fs.writeFileSync(path.join(__dirname,'assets.json'),JSON.stringify(file,null,2))
    fs.writeFileSync(path.join(__dirname,'tags.json'),JSON.stringify({tags},null,2))

    res.json({
        err:false,
        msg: "Successfully added asset"
    })
});
router.get('/', (req,res)=>{
    res.send('hello')
});
router.get('/*', (req,res)=>{
    res.status(404).send("404 NOT FOUND")
});
module.exports = router;