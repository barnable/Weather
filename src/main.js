import {getWeatherByCity} from './apiService.js';

const viewElems = {};

const getDOMElem = id => {
    return document.getElementById(id);
}

const connectHTMLelems = () => {
    viewElems.mainContainer = getDOMElem('mainContainer');
    viewElems.weatherSearchView = getDOMElem('weatherSearchView');
    viewElems.weatherForecastView = getDOMElem('weatherForecastView');
    
    viewElems.searchInput = getDOMElem('searchInput');
    viewElems.searchButton = getDOMElem('searchButton');
    viewElems.weatherCityContainer = getDOMElem('weatherCityContainer');

    viewElems.weatherCity= getDOMElem('weatherCity');
    viewElems.weatherIcon = getDOMElem('weatherIcon');

    viewElems.weatherCurrentTemp = getDOMElem('weatherCurrentTemp');
    viewElems.weatherMaxTemp = getDOMElem('weatherMaxTemp');
    viewElems.weatherMinTemp = getDOMElem('weatherMinTemp');

    viewElems.returnToSearchButton = getDOMElem('returnToSearchBtn');
}

const setupListeners= () =>{
    viewElems.searchInput.addEventListener('keydown', onEnterSubmit);
    viewElems.searchButton.addEventListener('click', onClickSubmit);
    viewElems.returnToSearchButton.addEventListener('click', returnToSearch);
}

const initializeApp = () =>{
    connectHTMLelems();
    setupListeners();
}

const onEnterSubmit = event =>{
    if(event.key === 'Enter'){
        let query = viewElems.searchInput.value;
        getWeatherByCity(query).then(data=>{
            displayWeatherData(data);
        });

    }
};
const onClickSubmit = () =>{
    let query = viewElems.searchInput.value;
    getWeatherByCity(query).then(data=>{
    displayWeatherData(data);
    });
};
const displayWeatherData = data =>{
    switchView();
    fadeInOut();
    console.log(data);
    const weather = data.consolidated_weather[0];
    const city = data.title;
    const icon =`https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
    const currTemp = weather.the_temp.toFixed(1);
    const maxTemp = weather.max_temp.toFixed(1);
    const minTemp = weather.min_temp.toFixed(1);
    
    viewElems.weatherCity.innerText = city;
    viewElems.weatherIcon.src= icon; 
    viewElems.weatherIcon.alt = weather.weather_state_name;
    viewElems.weatherCurrentTemp.innerText = `Aktualna temperatura to: ${currTemp}℃`;
    viewElems.weatherMaxTemp.innerText = `Maksymalna temperatura może wynieść: ${maxTemp}℃`;
    viewElems.weatherMinTemp.innerText= `Minimalna temperatura: ${minTemp}℃`;
fadeInOut();
}

const fadeInOut = () =>{
    if (viewElems.mainContainer.style.opacity ==='1' || viewElems.mainContainer.style.opacity === '' ){
        viewElems.mainContainer.style.opacity ='0';
    }else {
        viewElems.mainContainer.style.opacity ='1';
    }
}

const switchView = () => {
    if(viewElems.weatherSearchView.style.display!=='none'){
        viewElems.weatherSearchView.style.display= 'none';
        viewElems.weatherForecastView.style.display = 'initial';
    }else{
        viewElems.weatherSearchView.style.display= 'flex';
        viewElems.weatherForecastView.style.display = 'none';
    }
}

const returnToSearch = () =>{
    fadeInOut();
    setTimeout(() =>{
        switchView();
        fadeInOut();}, 500)
        viewElems.searchInput.value='';
    }


    

    document.addEventListener('DOMContentLoaded', initializeApp)
