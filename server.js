require('dotenv').config();

const express = require('express'),
      app = express(),
      logging = require('morgan'),
      ejs = require('ejs'),
      axios = require('axios');

const apiClient = axios.create();

app.use(logging('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    const apiUrl = "http://api.open-notify.org/astros.json";
    apiClient({ method: "get", url: apiUrl}).then(apiRes => {
        let astro = '';
        for(var i = 0; i < apiRes.data.people.length; i++){
            const astronauts = apiRes.data.people[i].name;
            astro = astro + astronauts
        }
        res.render("index", {astro});
    })
   
})

app.get('/locations', (req, res) => {
    const apiUrl = "http://api.open-notify.org/iss-now.json";
    apiClient({method: "get", url: apiUrl}).then(apiRes => {
        res.render("location", {location1: apiRes.data.iss_position.latitude, location2: apiRes.data.iss_position.longitude})
    })  
})

app.listen(process.env.PORT, err => {
    console.log(err || `listening on port ${process.env.PORT}...`);
})