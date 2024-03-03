<template>
  <div class="card">
    <div class="card-body">
      <el-row v-for="(item, index) in list" :key="index">
        <el-col :span="2">
          <i class="qi-307"></i>
        </el-col>

        <el-col :span="14">
          <span>{{ computedDay(index, item.fxDate) }}</span>
          <span>&nbsp;{{ computedChange(item.textDay, item.textNight) }}</span>
        </el-col>

        <el-col :span="2">
          <span class="category-tag">{{ item.category.substring(0, 1) }}</span>
        </el-col>
        <el-col :span="6">{{ item.tempMax }}° / {{ item.tempMin }}°</el-col>
      </el-row>

      <el-button round>查看近7日天气</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    daily: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    list() {
      return this.daily.slice(0, 3);
    },
  },
  methods: {
    computedWeekday(date) {
      return new Date(date).toLocaleDateString("zh-CN", { weekday: "short" });
    },
    computedDay(index, date) {
      return index === 0
        ? "今天"
        : index === 1
        ? "明天"
        : this.computedWeekday(date);
    },
    computedChange(textDay, textNight) {
      if (textDay !== textNight) {
        return `${textDay}转${textNight}`;
      }

      return textDay;
    },
  },
};
</script>

<style scoped>
.card-body > .el-row {
  margin-top: 1.5em;
}

.el-row > .el-col {
  margin-top: 0;
}

.category-tag {
  background-color: rgba(255, 255, 255, 0.15);
  padding: 0.125em 0.25em;
  border-radius: 0.4em;
}

.el-button {
  width: 100%;
  margin-top: 1.5em;
  border: 0;
  background-color: rgba(255, 255, 255, 0.3);
  line-height: 1.5em;
  color: #fff;
}

i + span {
  margin-left: 0.5em;
}
</style>
