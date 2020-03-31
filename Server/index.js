'use strict';

const express = require('express');
const fs = require('fs');
var path = require("path");
const router = express.Router();
// Require the controllers WHICH WE DID NOT CREATE YET!!var index = fs.readFileSync('index.html');


// URL TO POST AN ASSET
const _=require('lodash')
router.post('/asset', (req, res) => {
    console.log(req.params);
    console.log(req.body);
    let file = JSON.parse(fs.readFileSync(path.join(__dirname, 'assets.json')))
    let tags = JSON.parse(fs.readFileSync(path.join(__dirname, 'tags.json'))).tags
    let count = file.count;
    let assets = file.assets;
    assets.push({
        id: count + 1,
        ...req.body
    })
    for (let index = 0; index < req.body.tag.length; index++) { //TO LIST DOWN ALL TAGS
        const element = req.body.tag[index];
        if (!tags.includes(element)) {
            tags.push(element)
        }
    }
    count = count + 1
    file = {
        assets,
        count
    }
    fs.writeFileSync(path.join(__dirname, 'assets.json'), JSON.stringify(file, null, 2))
    fs.writeFileSync(path.join(__dirname, 'tags.json'), JSON.stringify({
        tags
    }, null, 2))

    res.json({
        err: false,
        msg: "Successfully added asset"
    })
});

// GET CALL FOR LIST OF ALL ASSETS
router.get('/asset', async (req, res) => {
    let file = JSON.parse(fs.readFileSync(path.join(__dirname, 'assets.json')))
    let assets = file.assets
    if (req.query.tag !== undefined) {
        assets = await assets.filter(elem=>elem.tag.includes(req.query.tag))
    }
    if(req.query.category){
        assets = await assets.filter(elem=>elem.category === req.query.category)
    }
    var total_income = 0
    await assets.forEach(elem =>total_income+=parseInt( elem.income));
    res.status(200).json({
        err: false,
        msg: "No Issues Found!",
        data: {assets,
        total_income}
    })
});

// GET CALL FOR LIST OF ALL tags
router.get('/tags', (req, res) => {
    let file = JSON.parse(fs.readFileSync(path.join(__dirname, 'tags.json')))

    res.status(200).json({
        err: false,
        msg: "No Issues Found!",
        data: file.tags
    })
});


// GET CALL FOR LIST OF ALL categories
router.get('/categories', (req, res) => {
    let file = JSON.parse(fs.readFileSync(path.join(__dirname, 'assets.json')))
    let categories = _.uniq(_.map(file.assets,'category'));
    res.status(200).json({
        err: false,
        msg: "No Issues Found!",
        data: categories
    })
});


router.get('/', (req, res) => {
    res.send('hello')
});
router.get('/*', (req, res) => {
    res.status(404).send("404 NOT FOUND")
});
module.exports = router;