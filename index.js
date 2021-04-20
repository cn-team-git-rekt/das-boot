require("dotenv").config();
const express = require("express");
const axios = require('axios');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", (req,res) => {
    res.status(200).json({"message": "ok"});
});

app.get("/api-test", (req,res)=>{
    const config = {
        method: 'get',
        url: 'https://v3.football.api-sports.io/status',
        headers: {
            'x-apisports-key': process.env.API_KEY,
        }
    }
    axios(config)
    .then((response) => {
        res.status(200).json({"message":"api-test working", "data": response.data});
    })
    .catch(function (error) {
        res.status(500).json({"message":"api-test working", "error": error});
    })
});

app.post("/fixtures", (req,res)=>{
    
    const config = {
        method: 'get',
        url: `hhttps://v3.football.api-sports.io/fixtures?league=${req.body.league}&season=${req.body.season}&next=${req.body.next}`,
        
        headers: {
            'x-rapidapi-key': process.env.API_KEY,
        }
    }
    axios(config)
    .then((response) => {
        console.log(response.data.response[0]);
        res.status(200).json({"message":"api-test working", "data": response.data});
    })
    .catch(function (error) {
        res.status(500).json({"message":"api-test not  working", "error": error});
    })
});

app.post("/predictions", (req,res)=>{
    const config = {
        method: 'get',
        url: `https://v3.football.api-sports.io/predictions?fixture=${req.body.fixture}`,
       
        headers: {
            'x-rapidapi-key': process.env.API_KEY,
        }
    }
    axios(config)
    .then((response) => {
        res.status(200).json({"message":"api-test working", "data": response.data});
    })
    .catch(function (error) {
        res.status(500).json({"message":"api-test not  working", "error": error});
    })
});

app.listen(5000, ()=>{
    console.log(`App is online: ${process.env.API_KEY}`);
});
