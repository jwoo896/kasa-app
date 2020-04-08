<template>
  <div class="title-container">{{ title }}</div>
</template>

<script>
export default {
  props: { titleProp: String },
  data() {
    return {
      title: ''
    }
  },
  created() {
    this.title = this.titleProp
  }
}
</script>

<style lang="scss" scoped>
.title-container {
  flex: 1;
  font-size: 38px;
  font-weight: 600;
  padding-top: 0.5em;
}
</style>
