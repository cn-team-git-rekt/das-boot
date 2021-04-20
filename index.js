require("dotenv").config();
const express = require("express");
const axios = require('axios');
const app = express();

let league = "39";
let season = "2020";
let next = "5";
let fixture = "592816";

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

app.get("/fixtures", (req,res)=>{
    const config = {
        method: 'get',
        url: `hhttps://v3.football.api-sports.io/fixtures?league=${league}&season=${season}&next=${next}`,
        // qs: {league: "39", season:"2020", from: "2021-04-20", to: "2021-04-27"},
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
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

app.get("/predictions", (req,res)=>{
    const config = {
        method: 'get',
        url: `https://v3.football.api-sports.io/predictions?fixture=${fixture}`,
       
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
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
