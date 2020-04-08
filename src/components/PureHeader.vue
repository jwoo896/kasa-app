<template>
  <div id="header-container">
    <div id="path-container">
      <span v-for="(pathName, index) of path" :key="pathName">
        <span
          class="pathName"
          :class="{ visited: index !== path.length - 1 }"
          >{{ pathName }}</span
        >
        <span class="pathSlash" v-if="index !== path.length - 1">/</span>
      </span>
    </div>
    <div id="title-container">
      <div id="status">Draft</div>
      <div id="title">{{ path[path.length - 1] }}</div>
      <button v-show="showButton" @click="edit" id="edit-button" class="button">
        Edit
      </button>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../services/EventBus'
import upperFirst from 'lodash/upperFirst'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
  props: { data: Object },
  data() {
    return {
      headerData: this.data,
      isEditing: false,
      showButton: true
    }
  },

  methods: {
    edit() {
      EventBus.$emit('toggleEdit', true)
    }
  },

  watch: {
    isEditing(val) {
      if (val) {
        Velocity(
          document.getElementById('edit-button'),
          'transition.slideRightOut',
          {
            drag: 400,
            duration: 1000
          }
        ).then(() => (this.showButton = false))
      } else {
        Velocity(
          document.getElementById('edit-button'),
          'transition.slideRightIn',
          {
            drag: 400,
            duration: 1000
          }
        ).then(() => (this.showButton = true))
      }
    }
  },

  created() {
    EventBus.$on('toggleEdit', isEditing => {
      this.isEditing = isEditing
      Velocity(
        document.getElementById('edit-buttom'),
        'transition.slideLeftIn',
        {
          drag: 400,
          duration: 1000
        }
      )
    })

    let pathArr = this.data.path.split('/')

    this.path = pathArr
      .map(routeName => upperFirst(routeName))
      .slice(1, pathArr.length) //remove trailing forward slash
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';

#header-container {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid $light-gray;
  text-align: start;
}

#path-container {
  flex: 1;
  margin: 0.5em 0 0 0.5em;
}

.pathName {
  margin: 0 0.5em 0 0.5em;

  &:hover {
    cursor: pointer;
  }
}

.pathSlash {
  text-decoration: none;
  color: $light-gray;
  margin: 0 0.5em 0 0.5em;
}

.visited {
  color: $base-color;
  text-decoration: underline;
}

#title-container {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 1em;
}

#title {
  flex: 35;
  font-size: 38px;
  align-self: center;
  margin: 0.5em 0 0.5em 0.4em;
}

#status {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid $orange;
  color: $orange;
  background-color: $light-orange;
  border-radius: 10%;
  height: 24px;
  padding: 0 0.7em 0 0.7em;
}

.button {
  &#edit-button {
    font-weight: 400;
    font-size: 20px;
    background-color: #ffffff;
    margin-right: 2em;
    padding: 0.3em 1em 0.3em 1em;
    color: $font-gray;
  }
}
</style>
