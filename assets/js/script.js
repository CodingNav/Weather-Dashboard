var APIKey  = "4383960b162385ee11decc2446137670";
var city = "new+york";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// https://api.openweathermap.org/data/2.5/weather?q=orlando&appid=4383960b162385ee11decc2446137670

fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

