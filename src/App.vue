<template>
  <div class="container">
    <van-overlay :show="show" @click="show = false">
      <div @click.stop>
        <el-input
          v-model="input"
          placeholder="搜索城市"
          @blur="searchCity"
        ></el-input>
      </div>
    </van-overlay>
    <i class="el-icon-search search-btn" @click="show = true"></i>
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
      show: false,
      input: "",
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

      const air = await axios.get("/v7/air/5d", {
        params: {
          location: this.location,
          key: process.env.VUE_APP_KEY,
        },
      });

      air.data.daily.forEach((item, index) => {
        weather.data.daily[index].category = item.category;
      });

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
    async getLocation() {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      const success = async (pos) => {
        const crd = pos.coords;
        await this.lookup(
          `${crd.longitude.toFixed(2)},${crd.latitude.toFixed(2)}`
        );
      };

      const error = () => {
        this.$message("获取设备当前位置失败");
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    },
    async lookup(location) {
      const instance = axios.create({
        baseURL: "https://geoapi.qweather.com",
      });

      const res = await instance.get("/v2/city/lookup", {
        params: {
          location,
          key: process.env.VUE_APP_KEY,
        },
      });

      const locationObject = res.data.location[0];

      this.location = locationObject.id;
      this.locationName = locationObject.name;
    },
    async searchCity() {
      await this.lookup(this.input);
    },
  },
  async mounted() {
    await this.getLocation();
  },
  watch: {
    async location(newValue) {
      await this.lookup(newValue);
      await this.getNow();
      await this.listDaily();
      await this.listHourly();
      await this.getAstronomy();
    },
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

.search-btn {
  position: absolute;
  top: 1.5em;
  left: 1.5em;
  font-size: 1.25rem;
}

.van-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
}

.van-overlay > div {
  padding: 1.5em;
  width: 100%;
}
</style>
