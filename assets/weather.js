// This is our API key. Add your own API key between the ""
var APIKey = "a04916f444556c5fd26aba6a427536b4";
var city = "Los Angeles";
var countryCode = "USA";
var today = new Date();
var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+","+countryCode+"&appid=" + APIKey;

// We then created an AJAX call
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {

  // Create CODE HERE to Log the queryURL
  console.log(queryURL);
  // Create CODE HERE to log the resulting object
  console.log(response);
  console.log(response.wind.speed);
  console.log(response.main.humidity);
  console.log(response.main.temp);
  
  var f = parseInt((response.main.temp - 273.15)*1.80 + 32);
  console.log(f);
  // Create CODE HERE to transfer content to HTML
  $(".currentCity").html(city);
  $(".todayDate").html(date);
var mausam = response.weather[0].main;
console.log(mausam);
  if (mausam === "Clouds") {
 $(".weatherIcon").attr("src", "images/cloud.png");
  }
  else if (mausam === "Rain") {
    $(".weatherIcon").attr("src", "images/rainy.png");
  }
  else if (mausam === "Drizzle") {
    $(".weatherIcon").attr("src", "images/drizzle.png");
  }

  else if (mausam === "Clear") {
    $(".weatherIcon").attr("src", "images/sunny.png");
  }
  else if (mausam === "Snow") {
    $(".weatherIcon").attr("src", "images/rainy.png");
  }

  else if (mausam === "Thunderstorm") {
    $(".weatherIcon").attr("src", "images/thunder.png");
  }

  else   {
    $(".weatherIcon").attr("src", "images/coudy.png");
  }


  $(".description").html(response.weather[0].description);

  $(".core1").html("Temperature: "+f+ "&#176 F");
  $(".core2").html("Wind Speed: "+response.wind.speed+"m/s");
  $(".core3").html("Humidity: "+response.main.humidity+"%");
  $(".core4").html("UV Index: "+response.main.uv);
  // Create CODE HERE to calculate the temperature (converted from Kelvin)
  // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
  // Create CODE HERE to dump the temperature content into HTML

});