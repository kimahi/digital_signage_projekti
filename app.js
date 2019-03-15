const schedule = require("node-schedule");
const fetch = require("node-fetch");
const express = require("express");
const app = express();
const fs = require("fs");

const hostname = '127.0.0.1';
const port = 3000;

let ita = `{
  stop(id: "HSL:4150201") {
    name
      stoptimesWithoutPatterns {
      realtimeArrival
      realtimeDeparture
      serviceDay
      headsign
      trip {
        routeShortName
      }
    }
  }  
}`;

let lansi = `{
  stop(id: "HSL:4150296") {
    name
      stoptimesWithoutPatterns {
      realtimeArrival
      realtimeDeparture
      serviceDay
      headsign
      trip {
        routeShortName
      }
    }
  }  
}`;

let vuosi = new Date().getFullYear();
let kk = new Date().getMonth()+1;
let d = new Date().getDate();
let paivays = vuosi + '/' + kk + '/' + d;
let paiva = new Date().getDay();

let myyrmaki = 16365;
let myllypuro = 35449;
let arabia = 16364;

let list = schedule.scheduleJob("1 * * * * *", () => {
  fetch('https://www.sodexo.fi/ruokalistat/output/daily_json/' + myyrmaki + '/' + paivays + '/fi')
  .then(res => res.json())
  .then(json => fs.writeFile("lista.json", JSON.stringify(json), (err) => {
    if (err) throw err;
    console.log("Lista tallennettu");
  }));


  fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({query:ita})
  })
  .then(res => res.json())
      .then(json => fs.writeFile("aikatauluIta.json", JSON.stringify(json), (err)=>{
        if (err) throw err;
        console.log("Aikataulu itään tallennettu")
  }));

  fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({query:lansi})
  })
  .then(res => res.json())
  .then(json => fs.writeFile("aikatauluLansi.json", JSON.stringify(json), (err)=>{
    if (err) throw err;
    console.log("Aikataulu länteen tallennettu")
  }))
});



app.use(express.static(__dirname + "/js"));
app.use(express.static(__dirname + "/"));

app.get("/", (req, res) => {
  fs.readFile(__dirname + "/index.html", "utf-8", (err, text) => {
    res.send(text);
  })
});

app.listen(8000);