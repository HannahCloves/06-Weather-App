$(document).ready(function () {

    // All dates shown on page
    const todaysDate = (moment().format("ll"));
    $("#dayOneHeader").append(moment().add(1, 'days').format("ll"));
    $("#dayTwoHeader").append(moment().add(2, 'days').format("ll"));
    $("#dayThreeHeader").append(moment().add(3, 'days').format("ll"));
    $("#dayFourHeader").append(moment().add(4, 'days').format("ll"));
    $("#dayFiveHeader").append(moment().add(5, 'days').format("ll"));

    // variables
    const locationSearch = $("#location-search");
    const locationPlace = $("#location-search input[name='search-location']");
    const locationError = $("#error");

    //on load up, displays previous city



    //when submit is pressed
    locationSearch.submit(function (event) {
        event.preventDefault();
        let locationPlaceString = locationPlace.val()
        const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + locationPlaceString + "&units=metric&appid=b3b7b9cfe416e5f453d88191c003cae5";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (locationData) {
            updateMainResults(locationData);
            updateFiveDay();
        }).catch(function (error) {
            locationError.text("Oops, have you spelled something wrong? Try again!");
        });

        function updateMainResults(locationData) {
            event.preventDefault();
            const locationName = locationData.name
            const locationTemp = locationData.main.temp
            const locationWind = locationData.wind.speed
            const locationHumid = locationData.main.humidity
            const locationIcon = locationData.weather[0].icon;
            const locationIconLink = "https://openweathermap.org/img/wn/" + locationIcon + ".png";
            const locationLat = locationData.coord.lat
            const locationLon = locationData.coord.lon
            const uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + locationLat + "&lon=" + locationLon + "&appid=b3b7b9cfe416e5f453d88191c003cae5";

            $("#main-location").text(locationName + " - " + todaysDate);
            $("#icon").attr("src", locationIconLink)
            $("#mainTemp").text("Current Temperature: " + locationTemp + " °C");
            $("#mainHumid").text("Humidity: " + locationHumid + "%");
            $("#mainWind").text("Wind Speed: " + locationWind + " MPH");


            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (uvData) {
                const uvRay = uvData.value
                $("#mainUV").text("UV:" + uvRay);

                if (uvData.value <= 2) {
                    $("#mainUV").addClass("lowUV");
                } else if
                    (uvData.value <= 5) {
                    $("#mainUV").addClass("modUV")
                } else if
                    (uvData.value <= 7) {
                    $("#mainUV").addClass("highUV")
                } else if
                    (uvData.value <= 10) {
                    $("#mainUV").addClass("veryHighUV")
                } else if
                    (uvData.value >= 11) {
                    $("#mainUV").addClass("extremeUV")
                }
            })
        };

        function updateFiveDay(fiveDayData) {
            event.preventDefault();
            const fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + locationPlaceString + "&cnt=6&units=metric&appid=b3b7b9cfe416e5f453d88191c003cae5";
            console.log(fiveDayURL)
            
            $.ajax({
                url: fiveDayURL,
                method: "GET"
            }).then(function (fiveDayData) {
                const dayOneIcon = toString(fiveDayData.list[1].weather["icon"])
                const locationIconLink = "https://openweathermap.org/img/wn/" + dayOneIcon + ".png";
                const dayOneTemp = fiveDayData.list[1].main.temp
                const dayOneHumid = fiveDayData.list[1].main.humidity
                console.log(dayOneTemp)
                console.log(dayOneHumid)
                console.log(dayOneIcon)
                console.log(locationIconLink)
                
                $("#dayOneTemp").text("Temperature:" + dayOneTemp + " °C");
                $("#dayOneHumdity").text("Humidity:"+ dayOneHumid);
                


            })
        };
    });
});

