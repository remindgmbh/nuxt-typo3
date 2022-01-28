import Vue, { CreateElement, VNode, VNodeData } from 'vue'
import { mount, Wrapper, createLocalVue } from '@vue/test-utils'
import type { ThisTypedMountOptions } from '@vue/test-utils'
import defu from 'defu'
import T3Menu from '~rmnd-typo3/components/layout/T3Menu/T3Menu'
import T3MenuDropdown from '~rmnd-typo3/components/layout/T3Menu/T3MenuDropdown'
import T3MenuContent from '~rmnd-typo3/components/layout/T3Menu/T3MenuContent'
import T3MenuTrigger from '~rmnd-typo3/components/layout/T3Menu/T3MenuTrigger'

describe('T3MenuTrigger', () => {
    it('should emit event', async () => {
        const triggerWrapper = mount(T3MenuTrigger, {
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
    localVue.component('T3MenuContent', T3MenuContent)

    const mountFunction: (options?: {
        menu?: ThisTypedMountOptions<InstanceType<typeof T3Menu>>
        trigger?: VNodeData
        dropdown?: VNodeData
    }) => {
        menuWrapper: Wrapper<InstanceType<typeof T3Menu>>
        triggerWrapper: Wrapper<InstanceType<typeof T3MenuTrigger>>
        dropdownWrapper: Wrapper<InstanceType<typeof T3MenuDropdown>>
        getContentWrapper: () => Wrapper<InstanceType<typeof T3MenuContent>>
    } = (options = { menu: {}, dropdown: {}, trigger: {} }) => {
        const items: Array<{ id: string }> = []
        const triggers: Array<{ render(h: CreateElement): VNode }> = []

        for (let index = 1; index < 5; index++) {
            const id = `item-${index}`
            items.push({ id })
            triggers.push({
                render(h: CreateElement): VNode {
                    return h(
                        T3MenuTrigger,
                        defu(options.trigger ?? {}, { props: { id } })
                    )
                },
            })
        }

        const dropdown = {
            render(h: CreateElement): VNode {
                return h(
                    T3MenuDropdown,
                    defu(options.dropdown ?? {}, {
                        props: { items },
                    })
                )
            },
        }

        const menuWrapper = mount(
            T3Menu,
            defu(options.menu ?? {}, {
                slots: {
                    default: [...triggers, dropdown],
                },
                localVue,
            })
        )

        const triggerWrapper = menuWrapper.findComponent(
            T3MenuTrigger
        ) as Wrapper<InstanceType<typeof T3MenuTrigger>>
        const dropdownWrapper = menuWrapper.findComponent(
            T3MenuDropdown
        ) as Wrapper<InstanceType<typeof T3MenuDropdown>>
        const getContentWrapper = () =>
            menuWrapper.findComponent(T3MenuContent) as Wrapper<
                InstanceType<typeof T3MenuContent>
            >

        return {
            menuWrapper,
            triggerWrapper,
            dropdownWrapper,
            getContentWrapper,
        }
    }

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
