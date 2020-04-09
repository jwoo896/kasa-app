import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const mutations = {
  TOGGLE_EDIT(state) {
    state.nameAddressComponentData.isEditing = !state.nameAddressComponentData
      .isEditing
  },

  SET_AUTOCOMPLETE_PLACE(state, place) {
    state.nameAddressComponentData.gMapsData.autocompletePlace = place
  },

  SET_MAP_MARKER_LAT(state, lat) {
    state.nameAddressComponentData.gMapsData.markerPos.lat = lat
  },

  SET_MAP_MARKER_LNG(state, lng) {
    state.nameAddressComponentData.gMapsData.markerPos.lng = lng
  },

  SET_INTERNAL_TITLE(state, internalTitle) {
    state.nameAddressComponentData.internalTitle = internalTitle
  },

  SET_NAME(state, name) {
    state.nameAddressComponentData.name = name
  }
}

export const actions = {
  toggleEdit({ commit }) {
    commit('TOGGLE_EDIT')
  },

  setAutocompletePlace({ commit }, place) {
    commit('SET_AUTOCOMPLETE_PLACE', place)
  },

  setMapMarker({ commit }, pos) {
    commit('SET_MAP_MARKER', pos)
  },

  setMapMarkerLat({ commit }, lat) {
    commit('SET_MAP_MARKER_LAT', lat)
  },

  setMapMarkerLng({ commit }, lng) {
    commit('SET_MAP_MARKER_LNG', lng)
  },

  setInternalTitle({ commit }, internalTitle) {
    commit('SET_INTERNAL_TITLE', internalTitle)
  },

  setName({ commit }, name) {
    commit('SET_NAME', name)
  }
}

export default new Vuex.Store({
  state: {
    nameAddressComponentData: {
      isEditing: false,
      internalTitle: '',
      name: '',
      gMapsData: {
        autocompletePlace: null,
        markerPos: { lat: 37.750212, lng: -122.422088 }
      }
    }
  },
  mutations,
  actions
})
