<template>
  <div id="properties-container">
    <PureMenu :items="items" :isEditing="isEditing" />
    <div class="content-view">
      <router-view />
      <PropertiesContentFooter v-show="isEditing" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      showFooter: false
    }
  },

  computed: {
    ...mapState({
      isEditing: state => {
        let footerEl = document.querySelector('.footer-wrapper')
        let contentViewEl = document.querySelector('.content-view')

        if (
          state.nameAddressComponentData.isEditing &&
          footerEl &&
          contentViewEl
        ) {
          footerEl.style.width = `${contentViewEl.offsetWidth}px`

          Velocity(footerEl, 'transition.slideUpIn', {
            drag: 400,
            duration: 1000
          })
        } else {
          Velocity(footerEl, 'transition.slideDownOut', {
            drag: 400,
            duration: 1000
          })
        }
        return state.nameAddressComponentData.isEditing
      }
    })
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
