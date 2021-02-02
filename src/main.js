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

    viewElems.returnToSearchButton = getDOMElem('returnToSearchButton');
}

const setupListeners= () =>{
    viewElems.searchInput.addEventListener('keydown', onEnterSubmit);
    viewElems.searchButton.addEventListener('click', onClickSubmit);
}

const initializeApp = () =>{
    connectHTMLelems();
    setupListeners();
}

const onEnterSubmit = event =>{
    console.log(event);
    if(event.key === 'Enter'){
        console.log(event);
        let query = viewElems.searchInput.value;
        getWeatherByCity(query).then(data=>{console.log(data);});
    }
};
const onClickSubmit = () =>{};

document.addEventListener('DOMContentLoaded', initializeApp)
