$(document).ready(function () {

    $("#dayOneHeader").append(moment().format("ll"));
    $("#dayTwoHeader").append(moment().add(1, 'days').format("ll"));
    $("#dayThreeHeader").append(moment().add(2, 'days').format("ll"));
    $("#dayFourHeader").append(moment().add(3, 'days').format("ll"));
    $("#dayFiveHeader").append(moment().add(4, 'days').format("ll"));








});