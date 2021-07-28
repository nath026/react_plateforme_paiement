const express = require("express");
const router = require("express").Router();
const cors = require("cors");
const fetch = require('node-fetch');

const app = express();



app.use(cors()) // Use this after the variable declaration

router.post('/psp', (req, res) => {
    res.sendStatus(202);
    setTimeout( ()=>{
        fetch(process.env.API_URL+'/webbook', { method: 'POST', body: "message='payment is accepted'" })
            .then(res => res.json()) // expecting a json response
            .then(json => console.log(json));
    },10000);
});


app.listen(3000, () => console.log("psp is listening"));
