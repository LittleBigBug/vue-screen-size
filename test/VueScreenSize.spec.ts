import { shallowMount, Wrapper } from '@vue/test-utils'
import { Component, Mixins } from 'vue-property-decorator'

import VueScreenSizeMixin from '../src/vue-screen-size'

@Component({
    template: `
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus eveniet, quidem veniam. Excepturi provident at soluta, minus quasi similique fuga, eum eligendi autem magni qui modi pariatur esse tenetur vel!
        </div>`
})
class ScreenSizeTest extends Mixins(VueScreenSizeMixin) {
    name = 'Mixin Test'
}

describe('vue-screen-size.ts', () => {
    const wrapper: Wrapper<ScreenSizeTest> = shallowMount(ScreenSizeTest)

    it('Sets $vssWidth and $vssHeight correctly', async () => {
        expect(wrapper.vm.$vssWidth).toBeGreaterThan(1)
        expect(wrapper.vm.$vssHeight).toBeGreaterThan(1)
    })
})
