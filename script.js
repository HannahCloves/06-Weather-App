$(document).ready(function () {

    // let locationsArray = JSON.parse(localStorage.getItem("searchedLocations")) || [];
    // console.log(locationsArray)
    // if (locationsArray)


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


    //when submit is pressed
    locationSearch.submit(function (event) {
        event.preventDefault();
        locationSearched = locationPlace.val();
        displayWeather(locationSearched);

    });

    function displayWeather(location) {
       // let locationPlaceString = location || locationPlace.val() //location saved a value
        //let searchedLocations = []; //an array to hold each searched location

        searchedLocations = JSON.parse(localStorage.getItem("searchedLocations")) || [];
        searchedLocations.push(location);
        localStorage.setItem("searchedLocations", JSON.stringify(searchedLocations));

        const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=metric&appid=b3b7b9cfe416e5f453d88191c003cae5";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (locationData) {
            updateMainResults(locationData);
            updateFiveDay();
            showLocations();
            locationError.hide()
        }).catch(function (error) {
            locationError.text("Oops, have you spelled something wrong? Try again!");
        });


        function updateMainResults(locationData) {
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
                $("#mainUV").text("UV Index:" + uvRay);

                if (uvData.value <= 2) {
                    $("#mainUV").addClass("lowUV").removeClass("modUV highUV veryHighUV extremeUV");
                } else if
                    (uvData.value <= 5) {
                    $("#mainUV").addClass("modUV").removeClass("lowUV highUV veryHighUV extremeUV")
                } else if
                    (uvData.value <= 7) {
                    $("#mainUV").addClass("highUV").removeClass("lowUV modUV veryHighUV extremeUV")
                } else if
                    (uvData.value <= 10) {
                    $("#mainUV").addClass("veryHighUV").removeClass("lowUV modUVhighUV highUV extremeUV")
                } else if
                    (uvData.value >= 11) {
                    $("#mainUV").addClass("extremeUV").removeClass("lowUV modUVhighUV highUV veryHighUV")
                }
            })
        };

        function updateFiveDay(fiveDayData) {
            const fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&cnt=6&units=metric&appid=b3b7b9cfe416e5f453d88191c003cae5";

            $.ajax({
                url: fiveDayURL,
                method: "GET"
            }).then(function (fiveDayData) {
                const dayOneIcon = fiveDayData.list[1].weather[0].icon
                const dayOneIconLink = "https://openweathermap.org/img/wn/" + dayOneIcon + ".png";
                const dayOneTemp = fiveDayData.list[1].main.temp
                const dayOneHumid = fiveDayData.list[1].main.humidity
                const dayTwoIcon = fiveDayData.list[2].weather[0].icon
                const dayTwoIconLink = "https://openweathermap.org/img/wn/" + dayTwoIcon + ".png";
                const dayTwoTemp = fiveDayData.list[2].main.temp
                const dayTwoHumid = fiveDayData.list[2].main.humidity
                const dayThreeIcon = fiveDayData.list[3].weather[0].icon
                const dayThreeIconLink = "https://openweathermap.org/img/wn/" + dayThreeIcon + ".png";
                const dayThreeTemp = fiveDayData.list[3].main.temp
                const dayThreeHumid = fiveDayData.list[3].main.humidity
                const dayFourIcon = fiveDayData.list[4].weather[0].icon
                const dayFourIconLink = "https://openweathermap.org/img/wn/" + dayFourIcon + ".png";
                const dayFourTemp = fiveDayData.list[4].main.temp
                const dayForHumid = fiveDayData.list[4].main.humidity
                const dayFiveIcon = fiveDayData.list[5].weather[0].icon
                const dayFiveIconLink = "https://openweathermap.org/img/wn/" + dayFiveIcon + ".png";
                const dayFiveTemp = fiveDayData.list[5].main.temp
                const dayFiveHumid = fiveDayData.list[5].main.humidity

                $("#dayOneIcon").attr("src", dayOneIconLink)
                $("#dayOneTemp").text("Temperature: " + dayOneTemp + " °C");
                $("#dayOneHumdity").text("Humidity: " + dayOneHumid + "%");
                $("#dayTwoIcon").attr("src", dayTwoIconLink)
                $("#dayTwoTemp").text("Temperature: " + dayOneTemp + " °C");
                $("#dayTwoHumdity").text("Humidity: " + dayOneHumid + "%");
                $("#dayThreeIcon").attr("src", dayThreeIconLink)
                $("#dayThreeTemp").text("Temperature: " + dayOneTemp + " °C");
                $("#dayThreeHumdity").text("Humidity: " + dayOneHumid + "%");
                $("#dayFourIcon").attr("src", dayThreeIconLink)
                $("#dayFourTemp").text("Temperature: " + dayOneTemp + " °C");
                $("#dayFourHumdity").text("Humidity: " + dayOneHumid + "%");
                $("#dayFiveIcon").attr("src", dayThreeIconLink)
                $("#dayFiveTemp").text("Temperature: " + dayOneTemp + " °C");
                $("#dayFiveHumdity").text("Humidity: " + dayOneHumid + "%");


            })
        };

        showLocations()
    }

    function showLocations() {
        $("#previouslySearched").empty();
        let locationsArray = JSON.parse(localStorage.getItem("searchedLocations")) || [];
        for (let i = 0; i < locationsArray.length; i++) {
            let locationName = locationsArray[i];

            $("#previouslySearched").append("<li class='list-group-item' id='locationButton'>" + locationName + "</li>")
        }
    }

    $("#previouslySearched").on("click", "li", function(event) {
        const locationButton = $(this).text();
        displayWeather(locationButton);

      })


    showLocations();

});