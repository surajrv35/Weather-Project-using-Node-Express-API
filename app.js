const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){
  console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "596c6c7ed19dccc5dca39c3879c4e7e2";
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey;
  https.get(url, function(response){

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p>The weather is currently "+desc+".</p>");
      res.write("<h1>The temperature in "+query+" is "+temp+" degree celcius.</p>");
      res.write("<img src="+iconUrl+">");
      res.send();
    })
  })
})


app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
