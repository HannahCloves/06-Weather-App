$(document).ready(function () {

    $("#dayOneHeader").append(moment().format("ll"));
    $("#dayTwoHeader").append(moment().add(1, 'days').format("ll"));
    $("#dayThreeHeader").append(moment().add(2, 'days').format("ll"));
    $("#dayFourHeader").append(moment().add(3, 'days').format("ll"));
    $("#dayFiveHeader").append(moment().add(4, 'days').format("ll"));


});


const locationSearch = $("#location-search");

locationSearch.search(function (event) {
  event.preventDefault();

  const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + movieTitleString + "&appid=b3b7b9cfe416e5f453d88191c003cae5";

  $.ajax({
    url: queryURL
  }).then(function (weatherData) {
    updateResults(weatherData);

  }).catch(function (error) {
    console.log("ERROR");
  })
});

