import type { CreateElement, VNode } from 'vue'
import { mount, Wrapper, createLocalVue } from '@vue/test-utils'
import RMenu from '~rmnd-typo3/components/ui/RMenu/RMenu'
import RMenuDropdown from '~rmnd-typo3/components/ui/RMenu/RMenuDropdown'
import RMenuContent from '~rmnd-typo3/components/ui/RMenu/RMenuContent'
import RMenuTrigger from '~rmnd-typo3/components/ui/RMenu/RMenuTrigger'

describe('RMenuTrigger', () => {
    it('should emit event', async () => {
        const triggerWrapper = mount(RMenuTrigger, {
            propsData: { id: 'trigger' },
            provide: {
                registerTrigger() {},
            },
        })
        await triggerWrapper.trigger('click')
        expect(triggerWrapper.emitted().toggle).toBeTruthy()
    })
})

describe('RMenu', () => {
    const localVue = createLocalVue()
    localVue.component('RMenuContent', RMenuContent)

    let menuWrapper: Wrapper<InstanceType<typeof RMenu>>
    let triggerWrapper: Wrapper<InstanceType<typeof RMenuTrigger>>
    let dropdownWrapper: Wrapper<InstanceType<typeof RMenuDropdown>>

    beforeEach(() => {
        const dropdown = {
            render(h: CreateElement): VNode {
                return h(RMenuDropdown, {
                    props: { items: [{ id: 'item-1' }] },
                })
            },
        }

        const trigger = {
            render(h: CreateElement): VNode {
                return h(RMenuTrigger, { props: { id: 'item-1' } })
            },
        }

        menuWrapper = mount(RMenu, {
            slots: {
                default: [dropdown, trigger],
            },
            localVue,
        })

        triggerWrapper = menuWrapper.findComponent(RMenuTrigger) as Wrapper<
            InstanceType<typeof RMenuTrigger>
        >
        dropdownWrapper = menuWrapper.findComponent(RMenuDropdown) as Wrapper<
            InstanceType<typeof RMenuDropdown>
        >
    })

    it('should register dropdown', () => {
        expect(menuWrapper.vm.dropdown).toBeDefined()
    })

    it('should show dropdown content after click', async () => {
        await triggerWrapper.trigger('click')

        const triggerId = triggerWrapper.vm.id

        const contentWrapper = dropdownWrapper.findComponent(
            RMenuContent
        ) as Wrapper<InstanceType<typeof RMenuContent>>

        expect(contentWrapper.exists()).toBeTruthy()

        const item = contentWrapper.vm.item
        const idField = contentWrapper.vm.idField

        const contentId = item[idField]

        expect(triggerId).toBe(contentId)
    })

    it("shouldn't show dropdown content without click", () => {
        const section = dropdownWrapper.find('section')
        expect(section.exists()).toBeFalsy()
    })
})
