<template>
  <div class="container">
    <h2>{{ locationName }}</h2>
    <div class="wrapper">
      <real-time
        :temp="temp"
        :text="text"
        :tempMax="tempMax"
        :tempMin="tempMin"
      />
    </div>
    <daily-forecast :daily="daily" />
    <hour-forecast :hour="hour" />
    <weather-widget :now="now" :sunrise="sunrise" :sunset="sunset" />
  </div>
</template>

<script>
import DailyForecast from "./components/DailyForecast.vue";
import RealTime from "./components/RealTime.vue";
import axios from "axios";
import HourForecast from "./components/HourForecast.vue";
import WeatherWidget from "./components/WeatherWidget.vue";

export default {
  components: { RealTime, DailyForecast, HourForecast, WeatherWidget },
  data() {
    return {
      locationName: "",
      location: "101010100",
      temp: "0",
      text: "晴",
      tempMax: "0",
      tempMin: "0",
      daily: [],
      hour: [],
      now: null,
      sunrise: "",
      sunset: "",
    };
  },
  methods: {
    async getNow() {
      const res = await axios.get("/v7/weather/now", {
        params: {
          location: this.location,
          key: process.env.VUE_APP_KEY,
        },
      });

      this.now = res.data.now;
      this.temp = this.now.temp;
      this.text = this.now.text;
    },
    async listDaily() {
      const weather = await axios.get("/v7/weather/7d", {
        params: {
          location: this.location,
          key: process.env.VUE_APP_KEY,
        },
      });

      // TODO: 未来一周天气预报
      const air = await axios.get("/v7/air/now", {
        params: {
          location: this.location,
          key: process.env.VUE_APP_KEY,
        },
      });

      const length = weather.data.daily.length;
      for (let i = 0; i < length; i++) {
        weather.data.daily[i].category = air.data.station[i].category;
      }

      this.daily = weather.data.daily;
      this.tempMax = weather.data.daily[0].tempMax;
      this.tempMin = weather.data.daily[0].tempMin;
    },
    async listHourly() {
      const hour = await axios.get("/v7/weather/24h", {
        params: {
          location: this.location,
          key: process.env.VUE_APP_KEY,
        },
      });

      this.hour = hour.data.hourly;
    },

    async getAstronomy() {
      const res = await axios.get("/v7/astronomy/sun", {
        params: {
          location: this.location,
          key: process.env.VUE_APP_KEY,
          date: "20240303",
        },
      });

      this.sunrise = res.data.sunrise;
      this.sunset = res.data.sunset;
    },
  },
  async mounted() {
    await this.getNow();
    await this.listDaily();
    await this.listHourly();
    await this.getAstronomy();
  },
};
</script>

<style scoped>
.container {
  text-align: center;
  color: #fff;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}
</style>
