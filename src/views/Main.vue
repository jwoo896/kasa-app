<template>
  <div id="main">
    <PureHeader :data="headerData" />
    <router-view />
  </div>
</template>

<script>
import PureHeader from '@/components/PureHeader.vue'

export default {
  components: {
    PureHeader
  },
  data() {
    return {
      // in production, this data would have been retrieved from the back-end/store implentation
      headerData: {
        path: '/home/properties/ACH'
      }
    }
  },
  created() {
    this.path = this.$route.path
  }
}
</script>

<style lang="scss" scoped>
#main {
  flex: 15;
  display: flex;
  flex-direction: column;
}
</style>
