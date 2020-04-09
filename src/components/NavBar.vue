<template>
  <div id="nav-bar" data-testid="nav-bar">
    <div v-for="icon in icons" :key="icon" class="nav-bar-item-wrapper">
      <PureIcon :name="icon" />
    </div>
  </div>
</template>

<script>
import PureIcon from '@/components/PureIcon.vue'

export default {
  components: {
    PureIcon
  },
  data() {
    return {
      icons: ['open-door', 'arrow-in', 'arrow-out', 'calendar', 'user', 'exit']
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';

#nav-bar {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: $base-color;
  align-items: center;
}

.nav-bar-item-wrapper {
  align-self: stretch;

  &:hover {
    cursor: pointer;
    background-color: $dark-blue;
  }
}
</style>
