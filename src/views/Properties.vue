<template>
  <div id="properties-container">
    <PureMenu :items="items" />
    <div class="content-view">
      <router-view />
      <PropertiesContentFooter v-show="showFooter" />
    </div>
  </div>
</template>

<script>
import { EventBus } from '../services/EventBus'
import PureMenu from '@/components/PureMenu.vue'
import PropertiesContentFooter from '@/components/PropertiesContentFooter.vue'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
  props: { property: String },
  components: { PureMenu, PropertiesContentFooter },
  data() {
    return {
      items: [
        {
          id: 'property-data',
          key: 'Property Data',
          data: [
            'Name & Address',
            'Access',
            'Pets',
            'Contacts',
            'Housekeepers',
            'Facilities',
            'IoT devices',
            'Utilities',
            'Room types',
            'Notes',
            'Website',
            'Settings'
          ],
          showKeyOnEdit: true,
          showDataOnEdit: false
        },
        {
          id: 'unit-template',
          key: 'Unit Template',
          data: ['Parking', 'Entertainment', 'Unit Wi-fi'],
          showKeyOnEdit: true,
          showDataOnEdit: true
        },
        {
          id: 'relations',
          key: 'Relations',
          data: ['Buildings', 'Units'],
          showKeyOnEdit: false,
          showDataOnEdit: false
        }
      ],
      isEditing: false,
      showFooter: false
    }
  },

  watch: {
    isEditing(val) {
      let el = document.querySelector('.footer-wrapper')

      if (val) {
        Velocity(el, 'transition.slideUpIn', {
          drag: 400,
          duration: 1000
        }).then(() => (this.showFooter = true))
      } else {
        Velocity(el, 'transition.slideDownOut', {
          drag: 400,
          duration: 1000
        }).then(() => (this.showFooter = false))
      }
    }
  },
  created() {
    EventBus.$on('toggleEdit', isEditing => (this.isEditing = isEditing))
  }
}
</script>

<style lang="scss">
#properties-container {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
</style>
