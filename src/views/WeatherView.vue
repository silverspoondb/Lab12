<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <!-- Text field with v-model binding to "city" -->
        <input 
          type="text" 
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
        />
        
        <!-- Search button with click listener -->
        <button @click="searchByCity" class="search-button">
          Search
        </button>
        
        <br><br>
        <p>Search Weather by City</p>
      </div>
    </div>
  </div>

      <main>
        <!--If there are no data returned, then skip rendering the information-->  
        <div v-if="weatherData">
          <!--Display the weather data attribute returned from API
          Example of API data: https://openweathermap.org/current-->  
          <h2 text-align="center">
              {{ weatherData.name }}, {{ weatherData.sys.country }}
          </h2>
          <div>
            <!--The image source of of the weather icon will be coming from a function called iconUrl
                which will be shared in script later-->  
            <img :src="iconUrl" alt="Weather Icon" />
            <p>{{ temperature }} °C</p>
            <p>{{ weatherData.weather[0].description }}</p>
          </div>
        </div>
      </main>
</template>

  <script>
  // The info section in 10.1.1 provided detailed information about this package 
  import axios from "axios";

  const apikey = "781d9322438bd531b17c8d1f48577c20";
  
  export default {
    name: "App",
    data() {
      return {
        city: "",
        weatherData: null,
        hourlyForecast: [],
        dailyForecast: [],
      };
    },
    //computed is a property that is used to define a property that 
    //is dependent on other data properties. 
    //If we using a more easy to understand words to understand the concept: 
    //the derived value such as temperature automatically update when the relevant value change.
    computed: {
      temperature() {
        return this.weatherData
          ? Math.floor(this.weatherData.main.temp)
          : null;
      },
      //Get the current weather icon using the API link
      iconUrl() {
        return this.weatherData
          ? `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`
          : null;
      },
    },
    mounted() {
      this.fetchCurrentLocationWeather();
    },
    methods: {
      async searchByCity() {
        if (!this.city) return;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(this.city)}&appid=${apikey}&units=metric`;
        await this.fetchWeatherData(url);
      },
      //Async in a easy to understand way means the method will run in backend thread, 
      //And it won't occupy the main thread, so the user experience is still smooth
      async fetchCurrentLocationWeather() {
        //The navigator.geolocation object is part of the Web API provided by modern web browsers
        //Please note this function is not belongs to Vue or openweather.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            //API link to obtain the current weather based on the current location browser identified 
            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
            //await means wait for the fetchWeatherData method to complete before proceeding
            await this.fetchWeatherData(url);
          });
        }
      },
      async fetchWeatherData(url) {
        try {
          const response = await axios.get(url);
          //Returned data from API is stored as JSON file in weatherData
          this.weatherData = response.data;
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    }
  }
</script>

<style>

.header {
  text-align: center; /* 确保内部文本也水平居中 */
  padding: 2rem;
  background-color: #f0f4f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
}
.span {
    font-size: 1.2rem;
    color: #555;
}
/* 可以根据需要调整输入框和按钮的样式 */
.search-input {
  padding: 0.5rem;
  margin-right: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #359e75;
}
</style>