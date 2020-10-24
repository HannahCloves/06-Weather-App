$(document).ready(function () {

    const todaysDate = (moment().format("ll"));
    $("#dayOneHeader").append(moment().add(1, 'days').format("ll"));
    $("#dayTwoHeader").append(moment().add(2, 'days').format("ll"));
    $("#dayThreeHeader").append(moment().add(3, 'days').format("ll"));
    $("#dayFourHeader").append(moment().add(4, 'days').format("ll"));
    $("#dayFiveHeader").append(moment().add(5, 'days').format("ll"));


    const locationSearch = $("#location-search");
    const locationPlace = $("#location-search input[name='search-location']");
    const locationError = $("#error");

    locationSearch.submit(function (event) {
        event.preventDefault();
        const locationPlaceString = locationPlace.val()
        const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + locationPlaceString + "&units=metric&appid=b3b7b9cfe416e5f453d88191c003cae5";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (locationData) {
            updateMainResults(locationData);
        }).catch(function(error) {
            locationError.text("Oops, have you spelled something wrong? Try again!");
        });

        function updateMainResults(locationData) {
            event.preventDefault();
            const locationName = locationData.name
            const locationTemp = locationData.main.temp
            const locationWind = locationData.wind.speed
            const locationHumid = locationData.main.humidity

            $("#main-location").text(locationName + " - " + todaysDate);
            $("#mainTemp").text("Current Temperature: " + locationTemp + " °C");
            $("#mainHumid").text("Humidity: " + locationHumid + "%");
            $("#mainWind").text("Wind Speed: " + locationWind + " MPH");

            const locationLat = locationData.coord.lat
            const locationLon = locationData.coord.lon
            const uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + locationLat + "&lon=" + locationLon + "&appid=b3b7b9cfe416e5f453d88191c003cae5";
            
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (uvURL) {
                const uvRay = uvURL.value
                $("#mainUV").text("UV:" + uvRay);
                console.log(uvRay)
            })
            
            

        };


    });






});

