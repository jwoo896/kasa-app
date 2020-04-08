<template>
  <div id="header-container" data-testid="pure-header">
    <div id="path-container">
      <span v-for="(pathName, index) of path" :key="pathName">
        <span
          class="path-name"
          :class="{ visited: index !== path.length - 1 }"
          >{{ pathName }}</span
        >
        <span class="path-slash" v-if="index !== path.length - 1">/</span>
      </span>
    </div>
    <div id="title-container">
      <div id="status">Draft</div>
      <div id="title">{{ path[path.length - 1] }}</div>
      <button v-show="!isEditing" @click="edit" id="edit-button" class="button">
        Edit
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import upperFirst from 'lodash/upperFirst'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
  props: { data: Object },
  data() {
    return {
      headerData: this.data,
      // isEditing: false,
      showButton: true
    }
  },

  methods: {
    edit() {
      this.$store.dispatch('toggleEdit')
    }
  },

  computed: {
    ...mapState({
      isEditing: state => {
        if (state.nameAddressComponentData.isEditing) {
          Velocity(
            document.getElementById('edit-button'),
            'transition.slideRightOut',
            {
              drag: 400,
              duration: 1000
            }
          )
        } else {
          Velocity(
            document.getElementById('edit-button'),
            'transition.slideRightIn',
            {
              drag: 400,
              duration: 1000
            }
          )
        }
      }
    })
  },

  created() {
    Velocity.mock = 0
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

.path-name {
  margin: 0 0.5em 0 0.5em;

  &:hover {
    cursor: pointer;
  }
}

.path-slash {
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
