import {getWeatherByCity} from './apiService.js';
import {mapListToDOMElements} from './DOMActions.js';

class WeatherApp{
    constructor(){
        this.viewElems = {};
        this.connectDOMElements();
        this.setupListeners();
    }

    connectDOMElements = () =>{
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem=>elem.id);
        this.viewElems = mapListToDOMElements(listOfIds);
    }

    setupListeners = () =>{
        this.viewElems.searchInput.addEventListener('keydown', this.handleSubmit);
        this.viewElems.searchButton.addEventListener('click', this.handleSubmit);
        this.viewElems.returnToSearchBtn.addEventListener('click', this.returnToSearch);
    }

    handleSubmit = () => {
        if(event.type==='click' || event.key === 'Enter'){
                let query = this.viewElems.searchInput.value;
                getWeatherByCity(query).then(data=>{
                this.displayWeatherData(data);
                });
            }

        }

    fadeInOut = () =>{
        if (this.viewElems.mainContainer.style.opacity ==='1' || this.viewElems.mainContainer.style.opacity === '' ){
        this.viewElems.mainContainer.style.opacity ='0';
        }else {
        this.viewElems.mainContainer.style.opacity ='1';
        }
    }

    switchView = () => {
        if(this.viewElems.weatherSearchView.style.display!=='none'){
            this.viewElems.weatherSearchView.style.display= 'none';
            this.viewElems.weatherForecastView.style.display = 'initial';
        }else{
            this.viewElems.weatherSearchView.style.display= 'flex';
            this.viewElems.weatherForecastView.style.display = 'none';
        }
    }

    returnToSearch = () =>{
        this.fadeInOut();
        setTimeout(() =>{
            this.switchView();
            this.fadeInOut();}, 500)
            this.viewElems.searchInput.value='';
        }

        displayWeatherData = data =>{
            this.switchView();
            this.fadeInOut();
            const weather = data.consolidated_weather[0];
            const city = data.title;
            const icon =`https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
            const currTemp = weather.the_temp.toFixed(1);
            const maxTemp = weather.max_temp.toFixed(1);
            const minTemp = weather.min_temp.toFixed(1);
        
            this.viewElems.weatherCity.innerText = city;
            this.viewElems.weatherIcon.src= icon; 
            this.viewElems.weatherIcon.alt = weather.weather_state_name;
            this.viewElems.weatherCurrentTemp.innerText = `Aktualna temperatura to: ${currTemp}℃`;
            this.viewElems.weatherMaxTemp.innerText = `Maksymalna temperatura może wynieść: ${maxTemp}℃`;
            this.viewElems.weatherMinTemp.innerText= `Minimalna temperatura: ${minTemp}℃`;
            this.fadeInOut();
        }
    }


// const viewElems = {};

// const getDOMElem = id => {
//     return document.getElementById(id);
// }

// const connectHTMLelems = () => {
//     viewElems.mainContainer = getDOMElem('mainContainer');
//     viewElems.weatherSearchView = getDOMElem('weatherSearchView');
//     viewElems.weatherForecastView = getDOMElem('weatherForecastView');
    
//     viewElems.searchInput = getDOMElem('searchInput');
//     viewElems.searchButton = getDOMElem('searchButton');
//     viewElems.weatherCityContainer = getDOMElem('weatherCityContainer');

//     viewElems.weatherCity= getDOMElem('weatherCity');
//     viewElems.weatherIcon = getDOMElem('weatherIcon');

//     viewElems.weatherCurrentTemp = getDOMElem('weatherCurrentTemp');
//     viewElems.weatherMaxTemp = getDOMElem('weatherMaxTemp');
//     viewElems.weatherMinTemp = getDOMElem('weatherMinTemp');

//     viewElems.returnToSearchButton = getDOMElem('returnToSearchBtn');
// }

// const setupListeners= () =>{
//     viewElems.searchInput.addEventListener('keydown', onEnterSubmit);
//     viewElems.searchButton.addEventListener('click', onClickSubmit);
//     viewElems.returnToSearchButton.addEventListener('click', returnToSearch);
// }

// const initializeApp = () =>{
//     connectHTMLelems();
//     setupListeners();
// }

// const onEnterSubmit = event =>{
    
// };

// const onClickSubmit = () =>{
//     let query = viewElems.searchInput.value;
//     getWeatherByCity(query).then(data=>{
//     displayWeatherData(data);
//     });
// };

    document.addEventListener('DOMContentLoaded', new WeatherApp())
