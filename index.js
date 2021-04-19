require("dotenv").config();
const express = require("express");
const axios = require('axios');
const app = express();

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

app.listen(5000, ()=>{
    console.log(`App is online: ${process.env.API_KEY}`);
});
