var coords=[];
var time=[];
navigator.geolocation.getCurrentPosition(function(position) {
    coords.push(position.coords.latitude, position.coords.longitude);
    $.getJSON('https://fcc-weather-api.glitch.me/api/current?lat='+coords[0]+'&lon='+coords[1], function (json) {
        app.json = json;
        app.city = json.name;
        app.weather = json.weather[0].description.charAt(0).toUpperCase()+json.weather[0].description.slice(1);
        app.celc = json.main.temp+'℃';
        app.far = ((json.main.temp*9/5)+32)+'℉';
        app.temperature = app.celc;
        console.log(app.city);
        
            $(function() {
                var xhr = $.get("https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="+app.weather);
                console.log("https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="+app.weather,'!');
                xhr.done(function(data) { 
                  $('.gif-bg').css('background-image', 'url(' + data.data.image_url + ')');
                });
              });
              
    });
    $.getJSON('http://api.geonames.org/timezoneJSON?lat='+coords[0]+'&lng='+coords[1]+'&username=emceelamb', function(timeInfo){
        var timeTemp=timeInfo.time.split(' ');
        app.time = timeTemp[1];
        app.date = timeTemp[0];
        app.country = timeInfo.countryName;
        console.log(app.time);
    });
    app.updateTime();
  });

console.log(coords);

// var weather = 


var app = new Vue({
    el: '#app',
    ready: function ready(){
        this.updateTime();
    },
    methods: {
        tempFormat: function(){
            if(app.imperial){
                app.temperature = app.celc;
            } else {
                app.temperature = app.far;
            }
            return app.imperial = !app.imperial;
            
        },
        updateTime: function updateTime(){
            $.getJSON('http://api.geonames.org/timezoneJSON?lat='+coords[0]+'&lng='+coords[1]+'&username=emceelamb', function(timeInfo){
                var timeTemp=timeInfo.time.split(' ');
                var date = timeTemp[0].split('-');

                switch(date[1]){
                    case '01':
                        date[1]='January';
                        break;
                    case '02':
                        date[1]='February';
                        break;
                    case '03':
                        date[1]='March';
                        break;
                    case '04':
                        date[1]='April';
                        break;
                    case '05':
                        date[1]='May';
                        break;
                    case '06':
                        date[1]='June';
                        break;
                    case '07':
                        date[1]='July';
                        break;
                    case '08':
                        date[1]='August';
                        break;
                    case '09':
                        date[1]='September';
                        break;
                    case '10':
                        date[1]='October';
                        break;
                    case '11':
                        date[1]='November';
                        break;
                    case '12':
                        date[1]='December';
                        break;
                }

                app.time = timeTemp[1];
                app.date = date[1]+ ' ' + date[2]+ ', '+ date[0];
                // console.log(this);

                setTimeout(updateTime, 1000);
        });
        }
    },
    data: {
        json: null,
        hello: "hello",
        coords: coords,
        city: null,
        weather: null,
        celc: null,
        far: null,
        temperature: null,
        time: null,
        date: null,
        country: null,
        imperial: false
    }
});

// console.log('https://fcc-weather-api.glitch.me/api/current?lat='+coords[0]+'&lon='+coords[1]);


// app.time = app.updateTime();

// giphy 

$(function() {
    var xhr = $.get("https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="+app.weather);
    console.log(xhr,'!');
    xhr.done(function(data) { 
      $('.gif-bg').css('background-image', 'url(' + data.data.image_url + ')');
    });
  });