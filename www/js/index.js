
$(function() {
    hide_about();
    $('#filters').hide();
    $('#data_place').hide();
    $('#header_text').text('WEATHER & ALERT');

    $("#criteria").change(function() {
        var criteria_text = $("#criteria option:selected").text();
        var criteria_val = $("#criteria option:selected").val();
        var city = $("#city option:selected").val();
        $('#header_text').text(criteria_text);
        
        if (criteria_val == 'weather') {
            load_weather(city);
        } else {
            load_alert(city);
        }
    });
    
    $("#city").change(function() {
        var city = $("#city option:selected").val();
        load_weather(city);
    });
    
    load_weather('denver');
})

welcome_click = function() {
    $('#filters').show();
    $('#data_place').show();
    $('#welcome').hide();
    $('#header_text').text('WEATHER');
}

refresh_click = function() {
    var city = $('#city').val();
    load_weather(city);
}

show_about = function() {
    $('#about_app').show();
}

hide_about = function() {
    $('#about_app').hide();
}

load_weather = function(city) {
    // build our API url
    var forecastURL = 'https://api.forecast.io/forecast/';
    var APIKey= 'ca70e4a6b4a8d2196cb11407aca17c43';
    
    if (city == 'denver') {
        var lat = 39;
        var lng = 104;
    } else if (city == 'kathmandu') {
        var lat = 27;
        var lng = 85;
    } else if (city == 'newyork') {
        var lat = 40;
        var lng = 74;
    } 
    
    var url = forecastURL + APIKey + '/' + lat + ',' + lng;
    
    var data = {
        units : 'us'
    };
    
    $.ajax({
        url : url,
        type : 'GET',
        data : data,
        dataType : 'jsonp'
    }).done(function(result){
        // https://api.forecast.io/forecast/ca70e4a6b4a8d2196cb11407aca17c43/37.8267,-122.423
        var temp = Math.round(result.currently.temperature);
        var high =Math.round(result.daily.data[0].temperatureMax);
        var low =Math.round(result.daily.data[0].temperatureMin);
        var weather = result.daily.data[0].summary;
        var feelsLike = Math.round(result.currently.apparentTemperature);
        var iconClass = result.daily.data[0].icon;
        
        var content =   '<ul data-role="listview" id="data_list">' +
                        '<li>' +
                            '<h3>Temperature</h3>' +
                            '<p>' + temp + ' °F</p>' +
                        '</li>' +
                        '<li>' +
                            '<h3>High</h3>' +
                            '<p>' + high + ' °F</p>' +
                        '</li>' +
                        '<li>' +
                            '<h3>Low</h3>' +
                            '<p>' + low + ' °F</p>' +
                        '</li>' +
                        '<li>' +
                            '<h3>Weather</h3>' +
                            '<p>' + weather + '</p>' +
                        '</li>' +
                        '<li>' +
                            '<h3>Feels Like</h3>' +
                            '<p>' + feelsLike + ' °F</p>' +
                        '</li>' +
                        '</ul>';
        
        $('#data_place').html(content);
        
    });   
}

load_alert = function(city) {
    var content =   '<ul data-role="listview" id="data_list">' +
                        '<li>' +
                            '<h3>No Alerts to be shown.</h3>' +
                        '</li>' +
                    '</ul>';
        
    $('#data_place').html(content);
}