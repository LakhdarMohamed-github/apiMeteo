const API_URL = "http://api.openweathermap.org/data/2.5/weather?appid=39b6dca0a507b77062d70af8fe61a27d&q=";
const ICON_URL = "http://openweathermap.org/img/wn/";

$(function(){

    loadCities();

    $('#cities').on('change', function(){
        let city = $(this).val();
        let weather = getWeather(city);
    });
})

let loadCities = () => {
    fetch('http://127.0.0.1:5500/cities.json')
        .then(response => response.json())
        .then(data =>  {
            let options = "";
            data.forEach(element => {
                options += "<option value='"+element.name+"'>"+element.name+"</option>"
            });
            $('#cities').append(options);  
        })
}

let getWeather = (city) =>{
    
    fetch(API_URL + city)
        .then(response => response.json())
        .then(data => {
            let tempHtml = (data.main.temp - 273.15).toFixed(2) + " ºC";
            let iconHtml = "<img src='" + ICON_URL + data.weather[0].icon + ".png'>"
            $('#city').html(city);
            $('#temperature').html(tempHtml + iconHtml);

        })
}