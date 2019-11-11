
$(document).ready(function() {
  
  
// This is our API key. Add your own API key between the ""
var APIKey = "a04916f444556c5fd26aba6a427536b4";

var city = "Los Angeles";
// var countryCode = "USA";

var today = new Date();
var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();

//search city 
$("#inputImage").click(function (){

city = $("#searchInput").val();

// the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=" + APIKey;

// We then created an AJAX call
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        //converting into Fahrenheit measure
        var f = parseInt((response.main.temp - 273.15)*1.80 + 32); 
        
        $(".currentCity").html(city);
        $(".todayDate").html(date);

        
        $(".city6").html($(".city5").text());
        $(".city5").html($(".city4").text());
        $(".city4").html($(".city3").text());
        $(".city3").html($(".city2").text());
        $(".city2").html($(".city1").text());
        $(".city1").html(city);
        
      var mausam = response.weather[0].main;
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      console.log("lat: "+lat);
      console.log("lon: "+lon);

      uvIndex (lat, lon) //function call for uv index 

                // weather condition checking and matching the weather image;
                if (mausam === "Clouds") {
                $(".weatherIcon").attr("src", "images/cloud.png");
                }
                else if (mausam === "Rain") {
                  $(".weatherIcon").attr("src", "images/rain.png");
                }
                else if (mausam === "Drizzle") {
                  $(".weatherIcon").attr("src", "images/drizzle.png");
                }

                else if (mausam === "Clear") {
                  $(".weatherIcon").attr("src", "images/clear.png");
                }
                else if (mausam === "Snow") {
                  $(".weatherIcon").attr("src", "images/snow.png");
                }

                else if (mausam === "Thunderstorm") {
                  $(".weatherIcon").attr("src", "images/thunder.png");
                }

                else   {
                  $(".weatherIcon").attr("src", "images/Cloudy-128.png");
                }


                        $(".description").html(response.weather[0].description);

                        $(".core1").html("Temperature: "+f+ "&#176 F");
                        $(".core2").html("Wind Speed: "+response.wind.speed+"m/s");
                        $(".core3").html("Humidity: "+response.main.humidity+"%");
      
      foreCast()


      }); //ajax close

}); //click function close



function uvIndex (lat, lon){
      // var lat= 28.5;
      // var lon= 27.32;


      var qURL = "http://api.openweathermap.org/data/2.5/uvi?appid="+APIKey+"&lat="+lat+"&lon="+lon;


                $.ajax({
                  url: qURL,
                  method: "GET"
                }).then(function(response) {
              
                $(".core4").html("UV Index: "+response.value);

                }); //ajax close

} //uvIndex function close

function foreCast(){
//api.openweathermap.org/data/2.5/forecast?q=Dallas+","+us
var fURL = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+APIKey;

      $.ajax({
        url: fURL,
        method: "GET"
      }).then(function(response) {
        var counter = 1;
        for (i=3; i<=40; i=i+8){
        var ft = parseInt((response.list[i].main.temp - 273.15)*1.80 + 32);
      
    
      $(".day"+counter+"1").html((response.list[i].dt_txt).substring(0, 11));
      var mausami = response.list[i].weather[0].main;
      console.log(mausami);
     
      if (mausami === "Clouds") {
        $(".day"+counter+"2").attr("src", "images/cloud.png");
        }
        else if (mausami === "Rain") {
          $(".day"+counter+"2").attr("src", "images/rain.png");
        }
        else if (mausami === "Drizzle") {
          $(".day"+counter+"2").attr("src", "images/drizzle.png");
        }

        else if (mausami === "Clear") {
          $(".day"+counter+"2").attr("src", "images/clear.png");
        }
        else if (mausami === "Snow") {
          $(".day"+counter+"2").attr("src", "images/snow.png");
        }

        else if (mausami === "Thunderstorm") {
          $(".day"+counter+"2").attr("src", "images/thunder.png");
        }

        else   {
          $(".day"+counter+"2").attr("src", "images/Cloudy-128.png");
        }
      
      $(".des"+counter).html(response.list[i].weather[0].description)
      $(".day"+counter+"3").html("Temperature: "+ft+"&#176 F");
      $(".day"+counter+"4").html("Humidity: "+response.list[i].main.humidity+"%");
        // }
        counter = counter + 1;
      }

      }); //ajax close

    }





}); // ready function
 