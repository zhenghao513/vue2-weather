<template>
  <div class="real-time">
    <div class="temp">
      <span class="temp-number">{{ temp }}</span>
      <span class="temp-symbol">℃</span>
    </div>

    <div class="weather">
      <span class="weather-text">{{ text }}</span>
      <span>&nbsp;</span>
      <span class="weather-range">{{ tempMax }}°/{{ tempMin }}°</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    temp: {
      type: Number,
      default: 0,
    },
    text: {
      type: String,
      default: "多云",
    },
    tempMax: {
      type: Number,
      default: 0,
    },
    tempMin: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
.temp {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0.7;
  transform: translateX(1rem);
}

.temp > span {
  margin-top: 0;
}

.temp-number {
  font-size: 7rem;
}

.temp-symbol {
  align-self: flex-start;
  font-size: 2.625rem;
}

.weather {
  font-size: 1.2rem;
}
</style>
