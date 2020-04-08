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
      />
      <PureTextInput
        :id="inputMetaData.longitudeInput.id"
        :label="inputMetaData.longitudeInput.label"
        :valProp="markerPosLng.toString()"
        :onBlurProp="inputMetaData.longitudeInput.onBlur"
      />
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/services/EventBus'
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
            EventBus.$emit('lat_updated', val)
            return val
          }
        },
        longitudeInput: {
          id: 'longitude-input',
          label: 'Longitude',
          onBlur: function(event) {
            let val = event.target.value
            EventBus.$emit('lng_updated', val)
            return val
          }
        }
      },
      isEditing: false,
      markerPosLat: 37.750212,
      markerPosLng: -122.422088,
      $_marker: null,
      $_googleMapsApi: null,
      $_geocoder: null,
      $_map: null
    }
  },

  computed: {
    markerPos: {
      get() {
        return { lat: this.markerPosLat, lng: this.markerPosLng }
      },

      set(newVal) {
        if (newVal.type === 'lat') {
          this.markerPosLat = newVal.val
        } else {
          this.markerPosLng = newVal.val
        }

        this.$_marker.setPosition({
          lat: this.markerPosLat,
          lng: this.markerPosLng
        })

        this.$_map.setZoom(16)
        this.$_map.setCenter({
          lat: this.markerPosLat,
          lng: this.markerPosLng
        })
      }
    }
  },

  methods: {
    createResetControlButton(defaultPos) {
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
        this.markerPos = { type: 'lat', val: defaultPos.lat }
        this.markerPos = { type: 'lng', val: defaultPos.lng }
      })

      this.$_map.controls[
        this.$_googleMapsApi.maps.ControlPosition.TOP_RIGHT
      ].push(controlDiv)
    }
  },

  created() {
    EventBus.$on('googleMaps', google => {
      const defaultPos = { lat: 37.750212, lng: -122.422088 }
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
        position: defaultPos,
        map: this.$_map,
        draggable: true,
        animation: this.$_googleMapsApi.maps.Animation.DROP
      })

      this.createResetControlButton(defaultPos)
    })

    EventBus.$on('place_selected', place => {
      let location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      this.$_marker.setPosition(location)
      this.$_map.setCenter(location)
    })

    EventBus.$on('lat_updated', lat => {
      this.markerPos = { type: 'lat', val: parseFloat(lat) }
    })
    EventBus.$on('lng_updated', lng => {
      this.markerPos = { type: 'lng', val: parseFloat(lng) }
    })

    EventBus.$on('toggleEdit', isEditing => {
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
    })
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
