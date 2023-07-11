const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html")
})

app.post("/", function(req, res) {
  const query = req.body.cityName
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=f6c1aa347d9af6983f7608391626612d&units=imperial"
  https.get(url, function(resp) {
    console.log(resp.statusCode);
    resp.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDesc = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The weather is currently "+ weatherDesc+".</h1>")
      res.write("<img src="+ imageUrl +">")
      res.write("<h1>The temp in "+query+" is " + temp+ "F.</h1>")
      res.send()
    })
  })
  console.log("posted");
})

app.listen(8000, function() {
  console.log("server running");
})
