const express = require('express');
const app = express();
const _fetch = require("node-fetch");

const yelp = require('yelp-fusion');
const client = yelp.client('nyBMTZJPi29E44rMIqcmu2d04GumzTtHMiNcr4x8UDqTKNpFwVPGjhyzSWbTi4WMr9WAQVWhg5Egrfnr4nKl3uPWGO5bqkFsuS220yceKilSILioxrDkNclccvGEXnYx');
const clID = "OrtBOrL-rs839p0-N8NhVg";

app.set("view engine", "ejs");
app.use(express.static('public'));


const port = process.env.PORT || 3000;



app.get("/", (req, res)=>{
    res.render("home");
})

app.get("/searchresults", (req, res)=>{
    let loc = req.query.loc;
    client.search({
        term: 'food',
        location: loc
    }) .then(response =>{
        const data = response.jsonBody.businesses;      
        res.render("searchresults", {data: data})     
    }) .catch(e=>{
        console.error(e);
        
    })
    
})



app.listen(port, ()=>{
    console.log(`Listening on Port: ${port}`);
    
})

