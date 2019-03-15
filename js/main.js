let lista = [];
let paiva = new Date().getDay();
let nyt = document.getElementById("paiva");
let ruoat, ita, lansi, saap, unix, tunnit, minuutit, kuvaus, lampo ,tuuli, lampotila, ikoni;

setInterval(function() {
  let d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  let s = d.getSeconds();
  m = tark(m);
  s = tark(s);

  document.getElementById("kello").innerHTML = h + "." + m + "." + s;
});

const tark = (a) => {
  if (a < 10) {
    a = "0" + a;
  }
  return a;
};

fetch('aikatauluLansi.json')
    .then(res => res.json())
    .then(function(json) {
      console.log(json.data.stop.stoptimesWithoutPatterns)
  json.data.stop.stoptimesWithoutPatterns.forEach((g) => {
    lansi = document.getElementById("lansi");
    let hsldiv = document.createElement("div");
    let hslnimi = document.createElement("h3");
    let hslaika = document.createElement("p");
    hsldiv.classList.add("hsldiv");
    hslnimi.classList.add("hslnimi");
    hslaika.classList.add("hslaika");
    lansi.appendChild(hsldiv);
    hsldiv.appendChild(hslnimi);
    hsldiv.appendChild(hslaika);
    hslnimi.innerText = g.trip.routeShortName + " " + g.headsign;

    unix = g.serviceDay + g.realtimeArrival;
    saap = new Date(unix*1000);
    tunnit = saap.getHours();
    minuutit = "0" + saap.getMinutes();
    saap = tunnit + "." + minuutit.substr(-2);
    hslaika.innerText = saap;

  })

});

fetch('aikatauluIta.json')
.then(res => res.json())
.then(function(json) {
  console.log(json.data.stop.stoptimesWithoutPatterns);
  json.data.stop.stoptimesWithoutPatterns.forEach((g) => {
    ita = document.getElementById("ita");
    let hsldiv = document.createElement("div");
    let hslnimi = document.createElement("h3");
    let hslaika = document.createElement("p");
    hsldiv.classList.add("hsldiv");
    hslnimi.classList.add("hslnimi");
    hslaika.classList.add("hslaika");
    ita.appendChild(hsldiv);
    hsldiv.appendChild(hslnimi);
    hsldiv.appendChild(hslaika);
    hslnimi.innerText = g.trip.routeShortName + " " + g.headsign;

    unix = g.serviceDay + g.realtimeArrival;
    saap = new Date(unix*1000);
    tunnit = saap.getHours();
    minuutit = "0" + saap.getMinutes();
    saap = tunnit + "." + minuutit.substr(-2);
    hslaika.innerText = saap;

  })
});

const hae = () => {
fetch('lista.json')
.then(res => res.json())
.then(function(data) {
  let kerta = 0;
  console.log(data);
  data.courses.forEach((e) => {
    if (kerta > 3) {
      ruoat = document.getElementById("ruoatoik");
    } else {
      ruoat = document.getElementById("ruoatvas");
    }
    let div = document.createElement("div");
    let nimifi = document.createElement("h4");
    let nimien = document.createElement("h4");
    let tiedot = document.createElement("p");
    let hinta = document.createElement("p");
    div.classList.add("boxi");
    nimifi.classList.add("nimi");
    nimien.classList.add("nimi");
    tiedot.classList.add("teksti");
    hinta.classList.add("teksti");
    ruoat.appendChild(div);
    div.appendChild(nimifi);
    div.appendChild(nimien);
    div.appendChild(tiedot);
    div.appendChild(hinta);
    let nimiS = document.createTextNode(e.title_fi);
    let nimiE = document.createTextNode(e.title_en);
    let tieto = document.createTextNode(e.properties);
    let raha = document.createTextNode(e.price);
    nimifi.appendChild(nimiS);
    nimien.appendChild(nimiE);
    tiedot.appendChild(tieto);
    hinta.appendChild(raha);
    kerta++;
  })
})};

let paivannimi;

if (paiva===1) {
  paivannimi = "Maanantai";
  nyt.innerText = paivannimi;
  hae();
} else if (paiva===2) {
  paivannimi = "Tiistai";
  nyt.innerText = paivannimi;
  hae();
} else if (paiva===3) {
  paivannimi = "Keskiviikko";
  nyt.innerText = paivannimi;
  hae();
} else if (paiva===4) {
  paivannimi = "Torstai";
  nyt.innerText = paivannimi;
  hae();
} else if (paiva===5) {
  paivannimi = "Perjantai";
  nyt.innerText = paivannimi;
  hae();
} else {
  paivannimi = "Ei ruokaa";
  nyt.innerText = paivannimi;
}

fetch("http://api.openweathermap.org/data/2.5/weather?id=830153&APPID=37cf07c8dac578fd359c0e7d7fdbfb2c")
.then(res => res.json())
.then(function(json) {
  kuvaus = document.getElementById("kuvaus");
  lampo = document.getElementById("lampo");
  tuuli = document.getElementById("tuuli");
  ikoni = json.weather[0].icon;
  document.getElementById("saakuva").src = "http://openweathermap.org/img/w/" + ikoni + ".png";
  kuvaus.innerText = json.weather[0].description;
  lampo.innerText = (json.main.temp - 272.15).toFixed(1) + "°C";
  tuuli.innerText = json.wind.speed +  "m/s";
});

let yksi = document.getElementById("etu");
let kaksi = document.getElementById("hsl");
let kolme = document.getElementById("uutiset");
let nelja = document.getElementById("ruokalista");
let kerrat = 0;

setInterval(function() {
  if (kerrat === 0) {
    kaksi.scrollIntoView();
    kerrat ++;
  } else if (kerrat === 1) {
    kolme.scrollIntoView();
    kerrat ++;
  } else if (kerrat === 2) {
    nelja.scrollIntoView();
    kerrat ++;
  } else {
    yksi.scrollIntoView();
    kerrat = 0;
  }
}, 30000);

setTimeout(function() {
  location.reload(true);
},120000);