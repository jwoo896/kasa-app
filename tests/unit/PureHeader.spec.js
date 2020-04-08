import { mount } from '@vue/test-utils'
import PureHeader from '@/components/PureHeader.vue'

const wrapper = mount(PureHeader, {
  propsData: {
    data: { path: '/some/path' }
  }
})
describe('PureHeader.vue', () => {
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

  describe('methods', () => {
    it("emits 'toggleEdit' to the EventBus", () => {
      const spy = jest.spyOn(wrapper.vm, 'edit')

      wrapper.vm.edit()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})
