require("dotenv").config();
const express = require("express");
const axios = require('axios');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const SQL = require("./lib/sql");


app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const db = new SQL ("127.0.0.1", "root", "PASSWORD", "footyForecast");


db.select((error, results) => {
    if (error) {
        throw error
    } else {
        for (let result of results){
            console.log(`Hello ${result.username}`);
        }
    }
}, "test"); 



app.get("/", (req,res) => {
    res.status(200).json({"message": "ok"});
});

app.post("/api-test", (req,res)=>{
    const config = {
        method: 'get',
        url: 'https://v3.football.api-sports.io/status',
        headers: {
            'x-apisports-key': process.env.API_KEY,
        }
    }
    axios(config)
    .then((response) => {yeah 
        const resData = response.data;
        res.status(200).json({"message":"api-test working", "data": resData});
    })
    .catch(function (error) {
        res.status(500).json({"message":"api-test working", "error": error});
    })
}); 

app.post("/fixtures", (req,res)=>{
    console.log(req.body)
    const config = {
        method: 'get',
        url: `https://v3.football.api-sports.io/fixtures?league=${req.body.league}&season=${req.body.season}&next=${req.body.next}`,
        
        headers: {
            'x-apisports-key': process.env.API_KEY,
        }
    }
    axios(config)
    .then((response) => {
        const resData = response.data;
        console.log(resData);
        res.status(200).json({"message":"api-test working", "data": resData});
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
            'x-apisports-key': process.env.API_KEY,
        }
    }
    axios(config)
    .then((response) => {
        const resData = response.data;
        console.log(resData.response);
        res.status(200).json({"message":"api-test working", "data": resData});
    })
    .catch(function (error) {
        res.status(500).json({"message":"api-test not  working", "error": error});
    })
});

app.listen(5000, ()=>{
    console.log(`App is online: `);
});
