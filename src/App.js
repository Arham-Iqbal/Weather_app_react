import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [report, setForecast] = useState("");
  
  const apikey = "your-api";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

  useEffect(() => {
    if (city) {
      dataFetch();
    }
  }, [city]);

  function dataFetch() {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const temperature = data.main.temp; // Temperature in Celsius
        const weatherCondition = data.weather[0].description; // Weather description
        const humidity = data.main.humidity; // Humidity percentage

        const weatherReport = `Weather report: Temperature is: ${temperature}°C, Weather Condition: ${weatherCondition}, Humidity: ${humidity}%`;
        setForecast(weatherReport);
      })
      .catch((error) => {
        console.error("Error fetching the weather data:", error);
          
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-900 text-white">
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg text-center space-y-6 w-80">
        <h1 className="text-2xl font-bold text-gray-100">Weather App</h1>
        <label className="block text-lg text-gray-200">Enter City</label>
        <input
          value={city}
          type="text"
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter a city name"
          className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={dataFetch}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition duration-300"
        >
          Fetch Weather
        </button>
        <h2 className="text-lg text-gray-100 mt-4">{report}</h2>
      </div>
    </div>
  );
}

export default App;
