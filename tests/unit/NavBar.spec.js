import { shallowMount } from '@vue/test-utils'
import NavBar from '@/components/NavBar.vue'

describe('NavBar.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(NavBar)
    expect(wrapper.find('[data-testid="nav-bar"')).toBeDefined()
  })
})
