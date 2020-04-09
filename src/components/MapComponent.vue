<template>
  <div id="map-wrapper">
    <div id="map-instructions-text">
      If default pin is incorrect or entrance is off. This position will show up
      in the check-in instructions.
    </div>
    <div id="map"></div>
    <div id="latlng-input-wrapper">
      <PureTextInput
        :id="inputMetaData.latitudeInput.id"
        :label="inputMetaData.latitudeInput.label"
        :valProp="markerPosLat.toString()"
        :onBlurProp="inputMetaData.latitudeInput.onBlur"
        :isEditing="isEditing"
      />
      <PureTextInput
        :id="inputMetaData.longitudeInput.id"
        :label="inputMetaData.longitudeInput.label"
        :valProp="markerPosLng.toString()"
        :onBlurProp="inputMetaData.longitudeInput.onBlur"
        :isEditing="isEditing"
      />
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/services/EventBus'
import { mapState } from 'vuex'
import PureTextInput from '@/components/PureTextInput.vue'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
  components: {
    PureTextInput
  },

  data() {
    return {
      inputMetaData: {
        latitudeInput: {
          id: 'latitude-input',
          label: 'Latitude',
          onBlur: function(event) {
            let val = event.target.value
            this.$store.dispatch('setMapMarkerLat', parseFloat(val))
            return val
          }
        },
        longitudeInput: {
          id: 'longitude-input',
          label: 'Longitude',
          onBlur: function(event) {
            let val = event.target.value
            this.$store.dispatch('setMapMarkerLng', parseFloat(val))

            return val
          }
        }
      },
      $_marker: null,
      $_googleMapsApi: null,
      $_geocoder: null,
      $_map: null
    }
  },

  computed: {
    ...mapState({
      isEditing: state => {
        let isEditing = state.nameAddressComponentData.isEditing
        if (isEditing) {
          Velocity(
            document.getElementById('reset-control'),
            'transition.fadeIn',
            {
              drag: 400,
              duration: 1000
            }
          )
        } else {
          Velocity(
            document.getElementById('reset-control'),
            'transition.fadeOut',
            {
              drag: 400,
              duration: 1000
            }
          )
        }
        return isEditing
      },

      markerPos(state) {
        let pos = state.nameAddressComponentData.gMapsData.markerPos
        return pos
      },

      markerPosLat(state) {
        let lat = state.nameAddressComponentData.gMapsData.markerPos.lat
        this.moveMarker()

        return lat
      },

      markerPosLng(state) {
        let lng = state.nameAddressComponentData.gMapsData.markerPos.lng
        this.moveMarker()

        return lng
      }
    })
  },

  methods: {
    createResetControlButton() {
      const defaultMarkerPos = { lat: 37.750212, lng: -122.422088 }
      let controlDiv = document.createElement('div')
      controlDiv.id = 'reset-control'
      controlDiv.style.display = 'none'
      controlDiv.index = 1

      let controlUI = document.createElement('div')
      controlUI.style.backgroundColor = '#fff'
      controlUI.style.border = '2px solid #fff'
      controlUI.style.cursor = 'pointer'
      controlUI.style.marginBottom = '22px'
      controlUI.style.textAlign = 'center'
      controlUI.title = 'Click to recenter the map'
      controlDiv.appendChild(controlUI)

      var controlText = document.createElement('div')
      controlText.style.color = 'rgb(25,25,25)'
      controlText.style.fontFamily = 'Roboto,Arial,sans-serif'
      controlText.style.fontSize = '16px'
      controlText.style.lineHeight = '38px'
      controlText.style.paddingLeft = '5px'
      controlText.style.paddingRight = '5px'
      controlText.innerHTML = 'Reset to default'
      controlUI.appendChild(controlText)

      controlUI.addEventListener('click', () => {
        this.$store.dispatch('setMapMarkerLat', defaultMarkerPos.lat)
        this.$store.dispatch('setMapMarkerLng', defaultMarkerPos.lng)
      })

      this.$_map.controls[
        this.$_googleMapsApi.maps.ControlPosition.TOP_RIGHT
      ].push(controlDiv)
    },

    moveMarker() {
      if (this.$_marker && this.$_map) {
        this.$_marker.setPosition({
          lat: this.markerPos.lat,
          lng: this.markerPos.lng
        })
        this.$_map.setZoom(16)
        this.$_map.setCenter(this.markerPos)
      }
    }
  },

  created() {
    EventBus.$on('googleMaps', google => {
      // initialize maps api to make markers on the fly and have access to geocoder and map
      this.$_googleMapsApi = google
      this.$_geocoder = new google.maps.Geocoder()
      this.$_map = new google.maps.Map(document.getElementById('map'), {
        disableDefaultUI: true
      })
      this.$_geocoder.geocode(
        { address: '3635 25th st, SF CA 94110' },
        (results, status) => {
          if (status !== 'OK' || !results[0]) {
            throw new Error(status)
          }

          this.$_map.setCenter(results[0].geometry.location)
          this.$_map.fitBounds(results[0].geometry.viewport)
        }
      )

      this.$_marker = new this.$_googleMapsApi.maps.Marker({
        position: this.markerPos,
        map: this.$_map,
        draggable: true,
        animation: this.$_googleMapsApi.maps.Animation.DROP
      })

      this.createResetControlButton()
    })
  },

  destroyed() {
    EventBus.$off('googleMaps')
  }
}
</script>

<style lang="scss" scoped>
#map-wrapper {
  align-self: stretch;
  margin: 2em 3em 1em 0;
}

#map {
  margin: 1em 0 1em 0;
  border-radius: 7px;
  width: 100%;
  height: 300px;
}

#latlng-input-wrapper {
  display: flex;
  flex-direction: row;
}
</style>
