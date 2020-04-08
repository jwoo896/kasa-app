<template>
  <div id="menu-container">
    <div v-for="(item, index) in items" :key="item.key">
      <div
        :id="item.id"
        class="section-title-wrapper"
        v-show="!item.showKeyOnEdit || showSectionTitles"
      >
        <div
          class="menu-item section-title"
          :class="{ 'top-border': index !== 0 }"
        >
          <div class="section-title text">{{ item.key }}</div>
          <i
            v-show="isEditing"
            class="mdi mdi-chevron-up section-title-arrow up"
            @click="toggleArrow"
          />
        </div>
      </div>
      <div v-show="!item.showDataOnEdit || isEditing">
        <router-link
          class="menu-item path-name text"
          v-for="path in item.data"
          :key="path"
          :to="{ name: path }"
          >{{ path }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
  props: {
    items: Array,
    isEditing: Boolean
  },
  data() {
    return {
      showSectionTitles: false
    }
  },
  methods: {
    toggleArrow(event) {
      let target = event.target
      let listEl = event.target.parentElement.parentElement.nextElementSibling
      if (target.classList[target.classList.length - 1] === 'up') {
        target.classList.toggle('up')
        Velocity(target, { rotateZ: '180deg' })
        Velocity(listEl, 'transition.slideUpOut', {
          drag: 400,
          duration: 200
        })
      } else {
        target.classList.toggle('up')
        Velocity(target, { rotateZ: '0deg' })
        Velocity(listEl, 'transition.slideDownIn', {
          drag: 400,
          duration: 1000
        })
      }
    }
  },

  watch: {
    isEditing(val) {
      if (val) {
        this.items.map(item => {
          if (item.showKeyOnEdit) {
            Velocity(
              document.getElementById(item.id),
              'transition.slideDownIn',
              {
                drag: 400,
                duration: 1000
              }
            ).then(() => (this.showSectionTitles = true))
          }
        })
      } else {
        this.items.map(item => {
          if (item.showKeyOnEdit) {
            Velocity(
              document.getElementById(item.id),
              'transition.slideUpOut',
              {
                drag: 400,
                duration: 200
              }
            ).then(() => (this.showSectionTitles = false))
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';

#menu-container {
  flex: 2;
  display: flex;
  flex-direction: column;
  border-right: 1px solid $light-gray;
}

.menu-item {
  display: flex;
  align-items: center;
  height: 3em;

  &.section-title {
    font-size: 14px;
    padding-top: 0.5em;

    &.top-border {
      border-top: 1px solid $light-gray;
      margin: 0;
    }
  }

  &.active {
    background-color: $active-gray;
    font-weight: 400;
  }
}

.text {
  padding: 0 1em 0 1em;
  text-align: start;
}

.path-name {
  color: $font-gray;
  text-decoration: none;

  &.router-link-exact-active {
    background-color: $active-gray;
    font-weight: 600;
  }
}

.section-title-arrow {
  flex: 1;
  font-size: 20px;

  &:hover {
    cursor: pointer;
  }
  &.active {
  }
}
</style>
