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
  </div>
</template>

<script>
import DailyForecast from "./components/DailyForecast.vue";
import RealTime from "./components/RealTime.vue";
import axios from "axios";

export default {
  components: { RealTime, DailyForecast },
  data() {
    return {
      locationName: "",
      location: "101010100",
      temp: 0,
      text: "晴",
      tempMax: 0,
      tempMin: 0,
      daily: [],
    };
  },
  methods: {
    async listDaily() {
      const weather = await axios.get("/v7/weather/7d", {
        params: {
          location: this.location,
          key: process.env.VUE_APP_KEY,
        },
      });

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
    },
  },
  async mounted() {
    await this.listDaily();
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
