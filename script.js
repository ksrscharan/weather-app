const APIKey = "b313c71908fd8b3a2d769a0dead059ed";
const container = document.querySelector(".container");
const button = document.querySelector(".submit");
const cityName = document.querySelector(".city-name");
const tempValue = document.querySelector(".temp-value");
const cityDisp = document.querySelector(".city-display");
const weatherCondition = document.querySelector(".weather-condition");
const icon = document.querySelector('.icon')
let city = "chennai";
let temp = null;
let weatherURL = null;


cityName.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    city = cityName.value.toLowerCase();
    console.log(city);
    weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;
    renderWeather();
  }
});


function getWeather() {
  return fetch(weatherURL)
    .then((response) => response.json())
    .then((data) => data);
}


async function renderWeather() {
  temp = await getWeather();
  tempValue.innerText = `${Math.floor(temp.main.temp)} °C`;
  cityDisp.innerText = city;
  weatherCondition.innerText = temp.weather[0].main;
  classManager();
}

tempValue.addEventListener('click', ()=>{
    if(tempValue.innerText === `${Math.floor(temp.main.temp)} °C`){
        tempValue.innerText = `${Math.floor((temp.main.temp)*1.8)} °F`
    }else{
        tempValue.innerText = `${Math.floor(temp.main.temp)} °C`
    }
})

function removeClasses() {
  container.classList.remove("rainy");
  container.classList.remove("warm");
  container.classList.remove("fog");
  container.classList.remove("cold");
}


function classManager() {
  if (temp.weather[0].main === "Clouds") {
    removeClasses();
    container.classList.add("cold");
    icon.innerHTML = '<i class="fa-solid fa-cloud"></i>'
  } else if (
    temp.weather[0].main === "Smoke" ||
    temp.weather[0].main === "Haze" ||
    temp.weather[0].main === "Mist" ||
    temp.weather[0].main === "Fog" ||
    temp.weather[0].main === "Dust"
  ) {
    removeClasses();
    container.classList.add("fog");
    icon.innerHTML = '<i class="fa-solid fa-water"></i>'
  } else if (temp.weather[0].main === "Clear") {
    removeClasses();
    container.classList.add("warm");
    icon.innerHTML = '<i class="fa-solid fa-sun"></i>'
  } else if (temp.weather[0].main === "Rain") {
    removeClasses();
    container.classList.add("rainy");
    icon.innerHTML = '<i class="fa-solid fa-umbrella"></i>'
  }
}
