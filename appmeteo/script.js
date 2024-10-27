// Description: Script pour la page meteo

document.getElementById('getWeather').addEventListener('click', async function () {
    const city = document.getElementById('city').value;

    if (city) {
        await fetchWeatherData(city);
    } else {
        alert('Veuillez entrer une ville');
    }
});



const fetchWeatherData = async (city) => {
    const apiKeys = "4cc18094901b09475d5bc95205a5b006";  // déclaration de la clé API
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeys}&units=metric`; // URL de l'API

    try {
        const response = await fetch(url);$
        const data = await response.json();
        if (response.ok) {
            throw new Error('Network response was not ok');
        }
       // const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Erreur lors de la récupération des données météo');
    }
};


function displayWeather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.getElementById('cityName').textContent = name;
    document.getElementById('description').textContent = description;
    document.getElementById('temp').textContent = temp + '°C';
    document.getElementById('humidity').textContent = 'Humidité: ' + humidity + '%';
    document.getElementById('wind').textContent = 'Vitesse du vent: ' + speed + ' km/h';
    document.getElementById('icon').src = `http://openweathermap.org/img/w/${icon}.png`;
}


// Charger les données météo pour Paris au chargement de la page
window.onload = () => {
    fetchWeatherData('Paris');
};
