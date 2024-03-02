<template>
  <div class="container">
    <h2>{{ locationName }}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locationName: "",
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
