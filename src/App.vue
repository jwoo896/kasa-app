<template>
  <div id="app">
    <NavBar />
    <Main />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Main from '@/views/Main.vue'

export default {
  components: {
    NavBar,
    Main
  }
}
</script>

<style lang="scss">
@import './scss/_variables.scss';

body {
  margin: 0;
  max-height: 100vh;
  overflow-y: scroll;
}

#app {
  display: flex; //we're building mobile first!
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $font-gray;
  background-color: $background-gray;
}

.content-view {
  flex: 8;
  display: flex;
  flex-direction: row;
  margin-bottom: 120px;
}

.button {
  background-color: $base-color;
  border: 1px solid $light-gray;
  border-radius: 7px;
  color: $white;
  font-size: 20px;
  outline: 0;
}

@media screen and (max-width: 900px) {
  #app {
    font-size: 14px;
  }
}
</style>
