$(document).ready(function () {

    const todaysDate = $("#mainLocation").append(moment().format("ll"));
    $("#dayOneHeader").append(moment().add(1, 'days').format("ll"));
    $("#dayTwoHeader").append(moment().add(2, 'days').format("ll"));
    $("#dayThreeHeader").append(moment().add(3, 'days').format("ll"));
    $("#dayFourHeader").append(moment().add(4, 'days').format("ll"));
    $("#dayFiveHeader").append(moment().add(5, 'days').format("ll"));


});


const locationSearch = $("#location-search");
const locationPlace = $("#location-search input[name='search-location']");

locationSearch.submit(function (event) {
    const locationPlaceString = locationPlace.val()
    event.preventDefault();
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + locationPlaceString + "&appid=b3b7b9cfe416e5f453d88191c003cae5";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(locationData){
        updateMainResults(locationData);
    });
    
    function updateMainResults(locationData) {
        const locationTemp = locationData.main.temp
    console.log(locationTemp)
    }
});


