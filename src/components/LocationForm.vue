<template>
  <div id="location-form-container">
    <div id="street-address-wrapper">
      <PureTextInput
        :dataIdProp="inputMetaData.streetAddressInput.autocomplete"
        :id="inputMetaData.streetAddressInput.id"
        :label="inputMetaData.streetAddressInput.label"
        :placeholder="inputMetaData.streetAddressInput.placeholder"
      />
    </div>
    <div id="city-state-zip-wrapper">
      <PureTextInput
        :id="inputMetaData.cityInput.id"
        :label="inputMetaData.cityInput.label"
        :placeholder="inputMetaData.cityInput.placeholder"
      />
      <PureTextInput
        :id="inputMetaData.stateInput.id"
        :label="inputMetaData.stateInput.label"
        :placeholder="inputMetaData.stateInput.placeholder"
      />
      <PureTextInput
        :id="inputMetaData.zipInput.id"
        :label="inputMetaData.zipInput.label"
        :placeholder="inputMetaData.zipInput.placeholder"
      />
    </div>
    <PureTextInput
      :id="inputMetaData.countryInput.id"
      :label="inputMetaData.countryInput.label"
      :placeholder="inputMetaData.countryInput.placeholder"
    />
  </div>
</template>

<script>
import { EventBus } from '@/services/EventBus'
import PureTextInput from '@/components/PureTextInput.vue'

export default {
  components: {
    PureTextInput
  },

  data() {
    return {
      inputMetaData: {
        streetAddressInput: {
          autocomplete: 'autocomplete',
          id: 'name',
          label: 'Street address',
          placeholder: 'Search address'
        },
        cityInput: {
          id: 'locality',
          label: 'City',
          placeholder: 'City'
        },
        stateInput: {
          id: 'administrative_area_level_1',
          label: 'State',
          placeholder: 'State'
        },
        zipInput: {
          id: 'postal_code',
          label: 'ZIP',
          placeholder: 'ZIP'
        },
        countryInput: {
          id: 'country',
          label: 'Country',
          placeholder: 'Country'
        }
      },
      formData: {
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      }
    }
  },

  created() {
    EventBus.$on('googleMaps', google => {
      const autocomplete = new google.maps.places.Autocomplete(
        document.querySelector('[data-id="autocomplete"]'),
        { types: ['geocode'] }
      )

      autocomplete.addListener('place_changed', () => {
        let place = autocomplete.getPlace()

        document.getElementById('name').value = place.name
        for (var i = 0; i < place.address_components.length; i++) {
          let addressType = place.address_components[i].types[0]
          if (this.formData[addressType]) {
            var val = place.address_components[i][this.formData[addressType]]
            document.getElementById(addressType).value = val
          }
        }
        EventBus.$emit('place_selected', place)
      })
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';

#location-form-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border-radius: 7px;
  border: 1px solid $light-gray;
  background-color: $form-background-gray;
  align-self: stretch;
  margin-right: 3em;
  padding: 0.5em 2em 1em 2em;
}

#street-address-wrapper {
}

#city-state-zip-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
