<template>
  <div id="nav-bar" data-testid="nav-bar">
    <i class="mdi mdi-door-open" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';

#nav-bar {
  flex: 1;
  min-height: 100vh;
  background-color: $base-color;
}

.mdi {
  font-size: 32px;
  color: $white;

  &:hover {
    cursor: pointer;
  }
}
</style>
