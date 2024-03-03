<template>
  <div class="grid">
    <div class="grid-item">
      <div class="card">
        <div class="card-body card-container">
          <div class="card-content">
            <span>{{ now?.windDir }}</span>
            <span>{{ now?.windScale }}级</span>
          </div>
          <div class="card-icon"></div>
        </div>
      </div>

      <div class="card">
        <div class="card-body card-container">
          <div class="card-content">
            <span>{{ dateFormat(sunrise) }}</span>
            <span>{{ dateFormat(sunset) }}</span>
          </div>
          <div class="card-content">
            <span>日出</span>
            <span>日落</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body" style="height: 100%">
        <div class="card-content info">
          <div>
            <span>湿度</span>
            <span>{{ now.humidity }}</span>
          </div>

          <div>
            <span>能见度</span>
            <span>{{ now.vis }}</span>
          </div>

          <div>
            <span>体感</span>
            <span>{{ now.feelsLike }}</span>
          </div>

          <div>
            <span>气压</span>
            <span>{{ now.pressure }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    now: {
      type: Object,
      default: null,
    },
    sunrise: {
      type: String,
      default: "",
    },
    sunset: {
      type: String,
      default: "",
    },
  },
  methods: {
    dateFormat(date) {
      if (date) {
        return date.split("T")[1].split("+")[0];
      }
    },
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0.625em;
}

.grid-item {
  display: grid;
  grid-column: 1fr;
  grid-row: 1fr 1fr;
  gap: 0.625em;
}

.grid-item > .card {
  min-height: 7.25em;
  margin-top: 0;
}

.grid > div {
  margin-top: 0;
}

.card-container {
  display: flex;
}

.card-container > div {
  margin-top: 0;
}

.card-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.card-icon {
  flex: 1;
}

.info {
  height: 100%;
  justify-content: space-between;
}

.info > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  line-height: 2em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.info > div > span {
  margin-top: 0;
}
</style>
