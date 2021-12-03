import Vue, { CreateElement, VNode, VNodeData } from 'vue'
import { mount, Wrapper, createLocalVue } from '@vue/test-utils'
import type { ThisTypedMountOptions } from '@vue/test-utils'
import defu from 'defu'
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

    let mountFunction: (options?: {
        menu?: ThisTypedMountOptions<InstanceType<typeof RMenu>>
        trigger?: VNodeData
        dropdown?: VNodeData
    }) => {
        menuWrapper: Wrapper<InstanceType<typeof RMenu>>
        triggerWrapper: Wrapper<InstanceType<typeof RMenuTrigger>>
        dropdownWrapper: Wrapper<InstanceType<typeof RMenuDropdown>>
        getContentWrapper: () => Wrapper<InstanceType<typeof RMenuContent>>
    }

    beforeEach(() => {
        mountFunction = (options = { menu: {}, dropdown: {}, trigger: {} }) => {
            const items: Array<{ id: string }> = []
            const triggers: Array<{ render(h: CreateElement): VNode }> = []

            for (let index = 1; index < 5; index++) {
                const id = `item-${index}`
                items.push({ id })
                triggers.push({
                    render(h: CreateElement): VNode {
                        return h(
                            RMenuTrigger,
                            defu(options.trigger ?? {}, { props: { id } })
                        )
                    },
                })
            }

            const dropdown = {
                render(h: CreateElement): VNode {
                    return h(
                        RMenuDropdown,
                        defu(options.dropdown ?? {}, {
                            props: { items },
                        })
                    )
                },
            }

            const menuWrapper = mount(
                RMenu,
                defu(options.menu ?? {}, {
                    slots: {
                        default: [...triggers, dropdown],
                    },
                    localVue,
                })
            )

            const triggerWrapper = menuWrapper.findComponent(
                RMenuTrigger
            ) as Wrapper<InstanceType<typeof RMenuTrigger>>
            const dropdownWrapper = menuWrapper.findComponent(
                RMenuDropdown
            ) as Wrapper<InstanceType<typeof RMenuDropdown>>
            const getContentWrapper = () =>
                menuWrapper.findComponent(RMenuContent) as Wrapper<
                    InstanceType<typeof RMenuContent>
                >

            return {
                menuWrapper,
                triggerWrapper,
                dropdownWrapper,
                getContentWrapper,
            }
        }
    })

    it('should register dropdown', () => {
        const { menuWrapper } = mountFunction()
        expect(menuWrapper.vm.dropdown).toBeDefined()
    })

    it('should show dropdown content after click', async () => {
        const { triggerWrapper, getContentWrapper } = mountFunction()

        const triggerId = triggerWrapper.vm.id

        await triggerWrapper.trigger('click')

        const contentWrapper = getContentWrapper()
        expect(contentWrapper.exists()).toBeTruthy()

        expect(triggerId).toBe(contentWrapper.vm.id)
    })

    it('should not show dropdown content without click', () => {
        const { getContentWrapper } = mountFunction()
        const contentWrapper = getContentWrapper()
        expect(contentWrapper.exists()).toBeFalsy()
    })

    it('should show dropdown content determined by initial value', async () => {
        const triggerId = 'item-2'

        const { getContentWrapper } = mountFunction({
            menu: {
                propsData: { value: triggerId },
            },
        })

        // wait for initial value to be assigned in mounted hook in menu component
        await Vue.nextTick()

        const contentWrapper = getContentWrapper()
        expect(contentWrapper.exists()).toBeTruthy()

        expect(triggerId).toBe(contentWrapper.vm.id)
    })

    it('should close open dropdown on trigger click', async () => {
        const { triggerWrapper, getContentWrapper } = mountFunction()

        const triggerId = triggerWrapper.vm.id

        await triggerWrapper.trigger('click')

        const contentWrapper = getContentWrapper()
        expect(contentWrapper.exists()).toBeTruthy()

        expect(triggerId).toBe(contentWrapper.vm.id)

        await triggerWrapper.trigger('click')

        expect(contentWrapper.exists()).toBeFalsy()
    })

    it('should close dropdown on outside click', async () => {
        // Test does not work right now although outside click works in browser
        // suggestions here did not help: https://github.com/vuejs/vue-test-utils-next/issues/456

        const triggerId = 'item-2'

        const outsideDiv = {
            render(h: CreateElement): VNode {
                return h('div', { attrs: { id: 'outside' } }, ['outside'])
            },
        }

        const elem = document.createElement('div')
        if (document.body) {
            document.body.appendChild(elem)
        }

        const { getContentWrapper, menuWrapper } = mountFunction({
            menu: {
                propsData: {
                    value: triggerId,
                },
                slots: {
                    default: [outsideDiv],
                },
                attachTo: elem,
            },
            dropdown: {
                props: {
                    closeOnOutsideClick: true,
                },
            },
        })
        // wait for initial value to be assigned in mounted hook in menu component
        await Vue.nextTick()

        const outsideDivWrapper = menuWrapper.find('#outside')

        await outsideDivWrapper.trigger('click')

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const contentWrapper = getContentWrapper()

        // expect(contentWrapper.exists()).toBeFalsy()
    })

    it("shouldn't close dropdown on inside click", async () => {
        const triggerId = 'item-2'

        const { getContentWrapper } = mountFunction({
            menu: {
                propsData: {
                    value: triggerId,
                },
            },
            dropdown: {
                props: {
                    closeOnOutsideClick: true,
                },
            },
        })

        // wait for initial value to be assigned in mounted hook in menu component
        await Vue.nextTick()

        const contentWrapper = getContentWrapper()

        await contentWrapper.trigger('click')

        expect(contentWrapper.exists()).toBeTruthy()
    })
})
