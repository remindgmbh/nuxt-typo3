import { CreateElement, VNode } from 'vue'
import { mount } from '@vue/test-utils'
import T3Modal from '~rmnd-typo3/components/ui/T3Modal/T3Modal'
import T3ModalBackground from '~rmnd-typo3/components/ui/T3Modal/T3ModalBackground'
import T3ModalContent from '~rmnd-typo3/components/ui/T3Modal/T3ModalContent'

describe('T3Modal', () => {
    const mountFunction = (props = {}) => {
        const background = {
            render(h: CreateElement): VNode {
                return h(T3ModalBackground)
            },
        }

        const content = {
            render(h: CreateElement): VNode {
                return h(T3ModalContent)
            },
        }

        return mount(T3Modal, {
            propsData: { value: false, ...props },
            slots: {
                default: [background, content],
            },
        })
    }

    it('should not show modal initially', () => {
        const wrapper = mountFunction()

        const content = wrapper.find('div.t3-modal__content')

        expect(content.exists()).toBeFalsy()
    })

    it('should show modal after setting value to true', async () => {
        const wrapper = mountFunction()

        await wrapper.setProps({ value: true })

        const content = wrapper.find('div.t3-modal__content')

        expect(content.exists()).toBeTruthy()
    })

    it('should show modal after setting value to true', async () => {
        const wrapper = mountFunction()

        await wrapper.setProps({ value: true })

        const content = wrapper.find('div.t3-modal__content')

        expect(content.exists()).toBeTruthy()
    })

    it('should hide modal after setting value to false', async () => {
        const wrapper = mountFunction()

        await wrapper.setProps({ value: true })

        let content = wrapper.find('div.t3-modal__content')

        expect(content.exists()).toBeTruthy()

        await wrapper.setProps({ value: false })

        content = wrapper.find('div.t3-modal__content')

        expect(content.exists()).toBeFalsy()
    })

    it('should not hide modal on background click without closeOnOutsideClick set', async () => {
        const wrapper = mountFunction()

        wrapper.vm.$on('input', (value: boolean) => wrapper.setProps({ value }))

        await wrapper.setProps({ value: true })

        let content = wrapper.find('div.t3-modal__content')
        const background = wrapper.find('div.t3-modal__background')

        expect(content.exists()).toBeTruthy()
        expect(background.exists()).toBeTruthy()

        await background.trigger('click')

        content = wrapper.find('div.t3-modal__content')

        expect(content.exists()).toBeTruthy()
    })

    it('should hide modal on background click with closeOnOutsideClick set', async () => {
        const wrapper = mountFunction({ closeOnOutsideClick: true })

        wrapper.vm.$on('input', (value: boolean) => wrapper.setProps({ value }))

        await wrapper.setProps({ value: true })

        let content = wrapper.find('div.t3-modal__content')
        const background = wrapper.find('div.t3-modal__background')

        expect(content.exists()).toBeTruthy()
        expect(background.exists()).toBeTruthy()

        await background.trigger('click')

        content = wrapper.find('div.t3-modal__content')

        expect(content.exists()).toBeFalsy()
    })

    it('should not hide modal on content click', async () => {
        const wrapper = mountFunction({ closeOnOutsideClick: true })

        wrapper.vm.$on('input', (value: boolean) => wrapper.setProps({ value }))

        await wrapper.setProps({ value: true })

        let content = wrapper.find('div.t3-modal__content')
        const background = wrapper.find('div.t3-modal__background')

        expect(content.exists()).toBeTruthy()
        expect(background.exists()).toBeTruthy()

        await content.trigger('click')

        content = wrapper.find('div.t3-modal__content')

        expect(content.exists()).toBeTruthy()
    })
})
