const apiKey = '01f6f382b4340981dca4a83b8f2b9f5b';
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const currentWeatherElement = document.getElementById('currentWeather');
const forecastContainer = document.getElementById('forecastContainer');

searchButton.addEventListener('click', async () => {
    const cityName = cityInput.value;
    if (cityName) {
        try {
            const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
            const currentWeatherData = await currentWeatherResponse.json();

            const currentTemperature = currentWeatherData.main.temp;
            const currentHumidity = currentWeatherData.main.humidity;
            const currentWeatherDescription = currentWeatherData.weather[0].description;
            currentWeatherElement.innerHTML = `Temperature: ${currentTemperature}°C | Humidity: ${currentHumidity}% | Weather Description: ${currentWeatherDescription}`;

            const weatherBackground = getWeatherBackground(currentWeatherDescription);
            document.body.className = weatherBackground;

            // ... (your other code)


            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`);
            const forecastData = await forecastResponse.json();

            
            forecastContainer.innerHTML = '';

           
            const dailyForecasts = {};
            forecastData.list.forEach(forecast => {
                const forecastDate = new Date(forecast.dt * 1000).toLocaleDateString();
                if (!dailyForecasts[forecastDate]) {
                    dailyForecasts[forecastDate] = forecast;
                }
            });

          
            for (const forecastDate in dailyForecasts) {
                const forecast = dailyForecasts[forecastDate];
                const forecastTemperature = forecast.main.temp;
                const forecastHumidity = forecast.main.humidity;
                const forecastWeatherDescription = forecast.weather[0].description;

                const forecastItem = document.createElement('div');
                forecastItem.classList.add('forecast-item');
                forecastItem.innerHTML = `
                    <p>Date: ${forecastDate}</p>
                    <p>Temperature: ${forecastTemperature}°C</p>
                    <p>Humidity: ${forecastHumidity}%</p>
                    <p>Description: ${forecastWeatherDescription}</p>
                `;

                forecastContainer.appendChild(forecastItem);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            currentWeatherElement.innerHTML = 'City not found';
            forecastContainer.innerHTML = ''; 
        }
    }
});





// function getWeatherBackground(weatherDescription) {
//     weatherDescription = weatherDescription.toLowerCase();
//     if (weatherDescription.includes('cloud')) {
//         return 'cloudy';
//     } else if (weatherDescription.includes('rain')) {
//         return 'rainny';
//     } else if (weatherDescription.includes('clear')) {
//         return 'sunny';
//     } else {
//         return 'night';
//     }
// }
