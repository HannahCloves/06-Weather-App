$(document).ready(function () {

    $("#dayOneHeader").append(moment().format("ll"));
    $("#dayTwoHeader").append(moment().add(1, 'days').format("ll"));
    $("#dayThreeHeader").append(moment().add(2, 'days').format("ll"));
    $("#dayFourHeader").append(moment().add(3, 'days').format("ll"));
    $("#dayFiveHeader").append(moment().add(4, 'days').format("ll"));


});


const locationSearch = $("#location-search");
const locationPlace = $("#location-search input[name='search-location']");

locationSearch.submit(function (event) {
    event.preventDefault();
    const locationPlaceString = locationPlace.val()
    const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + locationPlaceString + "&appid=b3b7b9cfe416e5f453d88191c003cae5";
    console.log(queryURL);
    

});

function updateResults(weatherData) {




}
