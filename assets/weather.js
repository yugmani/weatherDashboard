
$(document).ready(function() {
  
  
// This is our API key. Add your own API key between the ""
var APIKey = "a04916f444556c5fd26aba6a427536b4";

var city = "";
// var countryCode = "USA";

var today = new Date();
var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();

//localstorage GetItems
          var city1 = localStorage.getItem("city1");
          var city2 = localStorage.getItem("city2");
          var city3 = localStorage.getItem("city3");
          var city4 = localStorage.getItem("city4");
          var city5 = localStorage.getItem("city5");
          var city6 = localStorage.getItem("city6");
          $(".city1").html(city1);
          $(".city2").html(city2);
          $(".city3").html(city3);
          $(".city4").html(city4);
          $(".city5").html(city5);
          $(".city6").html(city6);

          var currentCity = localStorage.getItem("Current-city");
          $(".currentCity").html(currentCity);

          var todayDate = localStorage.getItem("current-date");  
          $(".todayDate").html(todayDate);

          var description = localStorage.getItem("description");
          $(".description").html(description);

          var weatherIcon = localStorage.getItem("weatherIcon");
          $(".weatherIcon").attr('src', weatherIcon);
          
          var core1 = localStorage.getItem("current-temp");
          $(".core1").html(core1);
          
          var core2 = localStorage.getItem("current-wind");
          $(".core2").html(core2);

          var core3 = localStorage.getItem("current-humidity");
          $(".core3").html(core3);

          var core4 = localStorage.getItem("current-uvIndex");
          $(".core4").html(core4);

          for (var i=1; i<6; i++){
                
                for (var j=1; j<5; j++) {
              
                      if (j===2){
                        var dayij = localStorage.getItem("day"+i+j);
                        $(".day"+i+j).attr('src', dayij);
                      }
                      else {
                        var dayij = localStorage.getItem("day"+i+j);
                        $(".day"+i+j).html(dayij);
                        
                      }
                      var desi = localStorage.getItem("des"+i);
                      $(".des"+i).html(desi);
                }//closing 2nd for loop

          } //closing 1st for loop


//search new city with event listener
$("#inputImage").click(function (){
  
    getStorageItems();

    city = $("#searchInput").val();

    // the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=" + APIKey;

    // then created an AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        //converting into Fahrenheit measure
        var f = parseInt((response.main.temp - 273.15)*1.80 + 32); 
        
        $(".currentCity").html(city);
        localStorage.setItem("Current-city", $(".currentCity").text());
        $(".todayDate").html(date);
        localStorage.setItem("current-date", $(".todayDate").text());
        
        $(".city6").html(city5);
        $(".city5").html(city4);
        $(".city4").html(city3);
        $(".city3").html(city2);
        $(".city2").html(city1);
        $(".city1").html(city);
        
        localStorage.setItem("city1", $(".city1").text());
        localStorage.setItem("city2", $(".city2").text());
        localStorage.setItem("city3", $(".city3").text());
        localStorage.setItem("city4", $(".city4").text());
        localStorage.setItem("city5", $(".city5").text());
        localStorage.setItem("city6", $(".city6").text());
       
        var mausam = response.weather[0].main;
        var lat = response.coord.lat;
        var lon = response.coord.lon;
      
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
                localStorage.setItem("weatherIcon", $(".weatherIcon").prop('src'));

        $(".description").html(response.weather[0].description);
        localStorage.setItem("description", $(".description").text());
        $(".core1").html("Temperature: "+f+ "&#176 F");
        $(".core2").html("Wind Speed: "+response.wind.speed+"m/s");
        $(".core3").html("Humidity: "+response.main.humidity+"%");
        localStorage.setItem("current-temp", $(".core1").text());
        localStorage.setItem("current-wind", $(".core2").text());
        localStorage.setItem("current-humidity", $(".core3").text());
      
      //function call for uv index
      uvIndex (lat, lon);

      //function call for 5 days weather forecast
      foreCast();
      

    }); //ajax close
      
}); //click function close


//Creating Function for UV Index
function uvIndex (lat, lon){
    
      var qURL = "http://api.openweathermap.org/data/2.5/uvi?appid="+APIKey+"&lat="+lat+"&lon="+lon;

          $.ajax({
            url: qURL,
            method: "GET"
          }).then(function(response) {
        
                $(".core4").html("UV Index: "+response.value);
                localStorage.setItem("current-uvIndex", $(".core4").text());
          }); //ajax close

} //uvIndex function close


//Creating function for 5 days weather forecast.
function foreCast(){

    var fURL = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+APIKey;

          $.ajax({
            url: fURL,
            method: "GET"
          }).then(function(response) {
                
                var counter = 1;
          
                for (var i=3; i<=40; i=i+8){

                      //conversion to fahrenheit
                      var ft = parseInt((response.list[i].main.temp - 273.15)*1.80 + 32);
              
                      $(".day"+counter+"1").html((response.list[i].dt_txt).substring(0, 11));
                      localStorage.setItem("day"+counter+"1", $(".day"+counter+"1").text());
                      
                      var mausami = response.list[i].weather[0].main;
                                  
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

                      localStorage.setItem("day"+counter+"2", $(".day"+counter+"2").prop('src'));
                      
                      $(".des"+counter).html(response.list[i].weather[0].description)
                      localStorage.setItem("des"+counter, $(".des"+counter).text());
                      $(".day"+counter+"3").html("Temperature: "+ft+"&#176 F");
                      localStorage.setItem("day"+counter+"3", $(".day"+counter+"3").text());
                      $(".day"+counter+"4").html("Humidity: "+response.list[i].main.humidity+"%");
                      localStorage.setItem("day"+counter+"4", $(".day"+counter+"4").text());

                      counter = counter + 1;

                } //for loop closing

          }); //ajax closing
     
  } //5days weather forecast function close

// creating function for localStorage GetItems
function getStorageItems(){

      var city1 = localStorage.getItem("city1");
      var city2 = localStorage.getItem("city2");
      var city3 = localStorage.getItem("city3");
      var city4 = localStorage.getItem("city4");
      var city5 = localStorage.getItem("city5");
      var city6 = localStorage.getItem("city6");
            $(".city1").html(city1);
            $(".city2").html(city2);
            $(".city3").html(city3);
            $(".city4").html(city4);
            $(".city5").html(city5);
            $(".city6").html(city6);

      var currentCity = localStorage.getItem("Current-city");
      $(".currentCity").html(currentCity);

      var todayDate = localStorage.getItem("current-date");  
      $(".todayDate").html(todayDate);

      var description = localStorage.getItem("description");
      $(".description").html(description);

      var weatherIcon = localStorage.getItem("weatherIcon");
      $(".weatherIcon").attr('src', weatherIcon);
      
      var core1 = localStorage.getItem("current-temp");
      $(".core1").html(core1);
      
      var core2 = localStorage.getItem("current-wind");
      $(".core2").html(core2);

      var core3 = localStorage.getItem("current-humidity");
      $(".core3").html(core3);

      var core4 = localStorage.getItem("current-uvIndex");
      $(".core4").html(core4);

            for (var i=1; i<6; i++){
                    for (var j=1; j<5; j++) {
                  
                          if (j===2){
                            var dayij = localStorage.getItem("day"+i+j);
                            $(".day"+i+j).attr('src', dayij);
                          }
                          else {
                            var dayij = localStorage.getItem("day"+i+j);
                            $(".day"+i+j).html(dayij);
                            
                          }
                          var desi = localStorage.getItem("des"+i);
                          $(".des"+i).html(desi);
                    
                    }//closing 2nd for loop
              
            } //closing 1st for loop

} //closing getStorageItems function



}); // ready function
 