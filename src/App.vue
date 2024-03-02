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
  </div>
</template>

<script>
import RealTime from "./components/RealTime.vue";
export default {
  components: { RealTime },
  data() {
    return {
      locationName: "",
      temp: 0,
      text: "",
      tempMax: 0,
      tempMin: 0,
    };
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
