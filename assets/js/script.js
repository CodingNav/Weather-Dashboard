var APIKey = "4383960b162385ee11decc2446137670";
var city = "new+york";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city + "&appid=" + APIKey;

var cityDisplay = document.querySelector("#city-name");
var iconDisplay = document.querySelector("#icon");
var tempDisplay = document.querySelector("#temp");
var windDisplay = document.querySelector("#wind");
var humidityDisplay = document.querySelector("#humidity");
var uvDisplay = document.querySelector("#uv-index");

// https://api.openweathermap.org/data/2.5/weather?q=orlando&appid=4383960b162385ee11decc2446137670

fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + APIKey;
        fetch(uvURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                uvDisplay.innerHTML = data.current.uvi;
            })


        cityDisplay.innerHTML = data.name;
        iconDisplay.src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
        tempDisplay.innerHTML = data.main.temp;
        windDisplay.innerHTML = data.wind.speed;
        humidityDisplay.innerHTML = data.main.humidity;
    });



