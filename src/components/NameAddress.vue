<template>
  <div id="name-address-container">
    <PureTitle :titleProp="pageTitle" />
    <PureTextInput
      :id="nameSection.internalTitleInput.id"
      :label="nameSection.internalTitleInput.label"
      :maxLength="nameSection.internalTitleInput.maxLength"
      :pattern="nameSection.internalTitleInput.pattern"
      :required="nameSection.internalTitleInput.required"
      :onBlurProp="nameSection.internalTitleInput.onBlur"
      :styleProp="nameSection.internalTitleInput.styleObj"
    />
    <PureTextInput
      :id="nameSection.nameInput.id"
      :label="nameSection.nameInput.label"
      :size="nameSection.nameInput.size"
      :required="nameSection.nameInput.required"
    />
    <PureTitle :titleProp="locationSection.title" />
    <LocationForm />
    <PureTitle :titleProp="gpsSection.title" />
    <MapComponent />
  </div>
</template>

<script>
import gmapsInit from '../utils/gmaps'
import { EventBus } from '@/services/EventBus'
import PureTitle from '@/components/PureTitle.vue'
import PureTextInput from '@/components/PureTextInput.vue'
import LocationForm from '@/components/LocationForm.vue'
import MapComponent from '@/components/MapComponent.vue'

export default {
  components: {
    PureTitle,
    PureTextInput,
    LocationForm,
    MapComponent
  },
  data() {
    return {
      pageTitle: 'Name & Address',

      nameSection: {
        internalTitleInput: {
          id: 'internal-title-input',
          label: 'Internal Title',
          maxLength: 3,
          pattern: /[A-Za-z]/,
          required: true,
          styleObj: {
            alignSelf: 'unset'
          },
          onBlur: event => {
            let val = event.target.value
            if (val.match(this.pattern)) {
              return val.toUpperCase()
            }
          }
        },

        nameInput: {
          id: 'name-input',
          label: 'Name',
          size: 50,
          required: true
        }
      },

      locationSection: {
        title: 'Location',
        addressLookupInput: {
          label: 'Address lookup'
        }
      },

      gpsSection: {
        title: 'GPS position'
      }
    }
  },
  async mounted() {
    try {
      const google = await gmapsInit()

      EventBus.$emit('googleMaps', google)
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<style lang="scss" scoped>
#name-address-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 2em;
}
</style>
