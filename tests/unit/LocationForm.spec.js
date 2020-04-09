import { mount, createLocalVue } from '@vue/test-utils'
import { actions, mutations } from '@/store'
import Vuex from 'vuex'
import LocationForm from '@/components/LocationForm.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('PureHeader.vue', () => {
  let state, store, wrapper

  beforeEach(() => {
    state = {
      nameAddressComponentData: {
        isEditing: false,
        gMapsData: {}
      }
    }

    store = new Vuex.Store({
      state,
      actions,
      mutations
    })

    wrapper = mount(LocationForm, {
      store,
      localVue
    })
  })

  it('renders', () => {
    expect(wrapper.find('[data-testid="location-form"')).toBeDefined()
  })

  it('should have disabled inputs if state.isEditing is false', () => {
    const inputs = wrapper.findAll('input')
    inputs.wrappers.forEach(input =>
      expect(input.attributes('disabled')).toBeDefined()
    )
  })

  it('should not have disabled inputs if state.isEditing is true', async () => {
    wrapper.vm.$store.dispatch('toggleEdit')
    await wrapper.vm.$nextTick()

    const inputs = wrapper.findAll('input')
    inputs.wrappers.forEach(input =>
      expect(input.attributes('disabled')).not.toBeDefined()
    )
  })

  //   trying to test behavior with the google maps api is tricky
  //   it("should dispatch setMapMarkerLat to the store when autocomplete's place value changes", async () => {
  //     const spy = jest.spyOn(wrapper.vm.$store, 'dispatch')
  //     let input = wrapper.find('[data-id="autocomplete"]')
  //     input.trigger('keypress.1')
  //     await wrapper.vm.$nextTick()
  //     // console.log(input)
  //     let autocompleteDiv = wrapper.find('.pac-item')
  //     autocompleteDiv.trigger('click')
  //     await wrapper.vm.$nextTick()

  //     expect(spy).toHaveBeenCalledWith('setMapMarkerLat')
  //   })
})
