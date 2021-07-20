var APIKey = "4383960b162385ee11decc2446137670";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city + "&appid=" + APIKey;

var cityDisplay = document.querySelector("#city-name");
var dateDisplay = document.querySelector("#current-date");
var iconDisplay = document.querySelector("#current-icon");
var tempDisplay = document.querySelector("#temp");
var windDisplay = document.querySelector("#wind");
var humidityDisplay = document.querySelector("#humidity");
var uvDisplay = document.querySelector("#uv-index");
var cardRow = document.querySelector("#card");

var cityInput = document.querySelector("#city");
var errorMessage = document.querySelector("#error-message");
var searchBtn = document.querySelector("#search-btn");
var historyDisplay = document.querySelector("#search-history");
var cityList = [];

errorMessage.style.display = "none";


// https://api.openweathermap.org/data/2.5/weather?q=orlando&appid=4383960b162385ee11decc2446137670

function searchWeather(city, addToHistory) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city + "&appid=" + APIKey;

    try {
        
    fetch(queryURL)
    .then(function (response) {
        if (response.ok == false) {
            throw "Failed";
        }
        return response.json();
    })
    .then(function (data) {
        if (addToHistory == true) {
            if (localStorage.getItem("city") != null) {
                cityList = JSON.parse(localStorage.getItem("city"));
            }
            cityList.push(city);
            localStorage.setItem("city", JSON.stringify(cityList));
        
            loadCities();
        }

        var uvURL = "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + APIKey;
        fetch(uvURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                uvDisplay.innerHTML = data.current.uvi;
                if (data.current.uvi < 3) {
                    uvDisplay.style.backgroundColor = "green";
                }
                else if (data.current.uvi < 8) {
                    uvDisplay.style.backgroundColor = "yellow";
                }
                else {
                    uvDisplay.style.backgroundColor = "red";
                }

                cardRow.innerHTML = "";
                for (i = 1; i < 6; i++) {
                    cardRow.innerHTML +=
                        `<div class="col s2">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                            <h3 class="card-title">${moment(data.daily[i].dt * 1000).format("M/D/YY")}</h3>
                            <img src="${'http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '@2x.png'}"/>
                            <p>Temp: ${data.daily[i].temp.day}°F</p>
                            <p>Wind: ${data.daily[i].wind_speed} MPH</p>
                            <p>Humidity: ${data.daily[i].humidity}%</p>
                        </div>
                    </div>
                </div> `;
                }
            });


        cityDisplay.innerHTML = data.name;
        dateDisplay.innerHTML = moment(data.dt * 1000).format("M/D/YY");
        iconDisplay.src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
        tempDisplay.innerHTML = data.main.temp;
        windDisplay.innerHTML = data.wind.speed;
        humidityDisplay.innerHTML = data.main.humidity;
    })
    .catch(function(err) {
        console.log(err);
        errorMessage.style.display = "block";
    });
    } catch (error) {
        console.log(error);
    }
}

function loadCities() {
    if (localStorage.getItem("city") != null) {
        cityList = JSON.parse(localStorage.getItem("city"));
    }
    historyDisplay.innerHTML = "";
    for (i = 0; i < cityList.length; i++) {
        historyDisplay.innerHTML += `<div class="col s12"><a class="waves-effect waves-light btn">${cityList[i]}</a></div>`;
    }
}

searchBtn.addEventListener('click', function () {
    var inputValue = cityInput.value;
    searchWeather(inputValue, true);
    cityInput.value = "";
    errorMessage.style.display = "none";

});

historyDisplay.addEventListener('click', function(event){
    searchWeather(event.target.textContent);   
});

loadCities();
searchWeather("new+york");


