import { mount, createLocalVue } from '@vue/test-utils'
import { actions, mutations } from '@/store'
import Vuex from 'vuex'
import PureHeader from '@/components/PureHeader.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('PureHeader.vue', () => {
  let state, store, wrapper

  beforeEach(() => {
    state = {
      nameAddressComponentData: {
        isEditing: false
      }
    }

    store = new Vuex.Store({
      state,
      actions,
      mutations
    })

    wrapper = mount(PureHeader, {
      propsData: {
        data: { path: '/some/path' }
      },
      store,
      localVue
    })
  })

  it('renders', () => {
    expect(wrapper.find('[data-testid="pure-header"')).toBeDefined()
  })

  it('displays current route path', () => {
    expect(wrapper.html()).toContain(
      '<span class="path-name visited">Some</span> <span class="path-slash">/</span></span><span><span class="path-name">Path</span>'
    )
  })

  it('displays the last route path as a title', () => {
    expect(wrapper.html()).toContain('<div id="title">Path</div>')
  })

  it("dispatches to store 'toggleEdit'", () => {
    const spy = jest.spyOn(wrapper.vm.$store, 'dispatch')

    wrapper.vm.edit()
    expect(spy).toHaveBeenCalledWith('toggleEdit')
  })

  it('should not have edit button if state.isEditing is true', async () => {
    wrapper.find('#edit-button').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('button').isVisible()).toBe(false)
  })

  it('should have edit button if state.isEditing is false', async () => {
    expect(wrapper.find('#edit-button').isVisible()).toBe(true)
  })
})
