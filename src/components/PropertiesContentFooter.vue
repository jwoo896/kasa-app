<template>
  <div class="footer-wrapper">
    <div class="footer-container">
      <div class="button-text-wrapper">
        <button
          class="button apply-changes-button"
          @click="actionEmitter"
          :value="selected"
        >
          {{ selected }}
        </button>
        <span class="saving-text" v-show="isSaving">Saving...</span>
      </div>
      <div class="v-select-wrapper">
        <v-select
          class="v-select"
          append-to-body
          :calculate-position="withPopper"
          :options="options"
          :selectable="option => option !== 'Actions'"
          :clearable="false"
          v-model="selected"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core'

export default {
  data() {
    return {
      options: ['Actions', 'Apply Changes', 'Save Draft', 'Cancel'],
      selected: 'Apply Changes',
      isSaving: false
    }
  },

  methods: {
    withPopper(dropdownList, component, { width }) {
      dropdownList.style.width = width

      const popper = createPopper(component.$refs.toggle, dropdownList, {
        placement: 'top',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -1]
            }
          },
          {
            name: 'toggleClass',
            enabled: true,
            phase: 'write',
            fn({ state }) {
              component.$el.classList.toggle(
                'drop-up',
                state.placement === 'top'
              )
            }
          }
        ]
      })

      return () => popper.destroy()
    },

    actionEmitter(event) {
      // full implementation would see values stored in Vuex and then this function
      // would retrieve and send the data to an appropriate API
      switch (event.target.value) {
        case 'Cancel':
          this.cancel()
          break
        default:
          this.applyChanges()
          return
      }
    },

    applyChanges() {
      this.isSaving = true
      // mock client-server transaction
      setTimeout(() => {
        this.$store.dispatch('toggleEdit')
        this.isSaving = false
      }, 2000)
    },

    cancel() {
      this.$store.dispatch('toggleEdit')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';

.footer-wrapper {
  position: fixed;
  bottom: 0px;
}

.footer-container {
  display: flex;
  flex-direction: row;
  border: 1px solid $light-gray;
  background-color: $white;
  height: 100px;
}

.button-text-wrapper {
  flex: 1;
  display: flex;
  flex-direction: row;
}

.apply-changes-button {
  margin: 1em 1em 1em 2em;
  padding: 0 1em 0 1em;
}

.saving-text {
  // flex: 1;
  align-self: center;
}

.v-select-wrapper {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.v-select {
  flex: 1;
  margin: 2em;
}
</style>
