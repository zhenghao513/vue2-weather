<template>
  <div class="card">
    <div class="card-body">
      <div class="content">
        <div v-for="(item, index) in hour" :key="index" class="content-item">
          <span>{{ item.temp }}°</span>
          <span>
            <i :class="`qi-${item.icon}`"></i>
          </span>
          <span>{{ item.humidity }}%</span>
          <span class="category-tag">{{ item.windScale.split("-")[0] }}级</span>
          <span>{{ computedTime(item.fxTime) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hour: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    computedTime(fxTime) {
      return new Date(fxTime).toLocaleTimeString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
  overflow-x: scroll;
  min-height: inherit;
}

.content > div {
  margin-top: 0;
}

.content > div:first-child {
  margin-left: auto;
}
.content > div:last-child {
  margin-right: auto;
}

.content-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.content-item:not(:first-child) {
  margin-left: 0.5em;
}

.content-item > span {
  margin-top: 0;
}
</style>
