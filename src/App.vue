<template>
  <div class="container">
    <h2>{{ locationName }}</h2>
    <real-time
      :temp="temp"
      :text="text"
      :tempMax="tempMax"
      :tempMin="tempMin"
    />
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
</style>
