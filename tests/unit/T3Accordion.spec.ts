import { mount, createLocalVue } from '@vue/test-utils'
import T3Accordion from '~rmnd-typo3/components/ui/T3Accordion/T3Accordion'
import T3CollapseTransition from '~rmnd-typo3/components/transition/T3CollapseTransition/T3CollapseTransition'

describe('T3Accordion', () => {
    const localVue = createLocalVue()
    localVue.component('T3CollapseTransition', T3CollapseTransition)

    const items = {
        'Title A': 'Content A',
        'Title B': 'Content B',
    }

    const mountFunction = (props = {}) => {
        const itemsArray = Object.keys(items)
            .sort((a, b) => a.localeCompare(b))
            .map((title) => ({
                title,
                content: items[title],
            }))

        return mount(T3Accordion, {
            localVue,
            propsData: { items: itemsArray, ...props },
            scopedSlots: {
                title: ({ item }) => item.title,
                content: ({ item }) => item.content,
            },
        })
    }

    it('should not show item initially', () => {
        const wrapper = mountFunction()
        const item = wrapper.find('section.t3-accordion__item')
        const contentWrapper = item.find(
            'section.t3-accordion__content-wrapper'
        )
        expect(contentWrapper.exists()).toBeFalsy()
    })

    it('should show item defined in initialActiveItems', () => {
        const initialActiveItem = 1

        const wrapper = mountFunction({
            initialActiveItems: [initialActiveItem],
        })
        const items = wrapper.findAll('section.t3-accordion__item')

        const item = items.at(initialActiveItem)

        const contentWrapper = item.find(
            'section.t3-accordion__content-wrapper'
        )

        expect(contentWrapper.exists()).toBeTruthy()
    })

    it('should show item after click and hide after another click', async () => {
        const wrapper = mountFunction()
        const item = wrapper.find('section.t3-accordion__item')

        const button = item.find('button.t3-accordion__link')
        await button.trigger('click')

        const title = button.text()
        const expectedContent = items[title]

        const actualContent = item
            .find('section.t3-accordion__content-wrapper')
            .find('div.t3-accordion__content')
            .text()

        expect(actualContent).toMatch(expectedContent)

        await button.trigger('click')

        const contentWrapper = item.find(
            'section.t3-accordion__content-wrapper'
        )

        expect(contentWrapper.exists()).toBeFalsy()
    })

    it('should not show item defined in disabled items', async () => {
        const disabledItem = 1

        const wrapper = mountFunction({ disabledItems: [disabledItem] })
        const items = wrapper.findAll('section.t3-accordion__item')

        const item = items.at(disabledItem)

        const button = item.find('button.t3-accordion__link')
        await button.trigger('click')

        const contentWrapper = item.find(
            'section.t3-accordion__content-wrapper'
        )

        expect(contentWrapper.exists()).toBeFalsy()
    })

    it('should hide item after another one is opened', async () => {
        const wrapper = mountFunction()

        const items = wrapper.findAll('section.t3-accordion__item')

        const itemA = items.at(0)
        const itemB = items.at(1)

        const buttonA = itemA.find('button.t3-accordion__link')
        const buttonB = itemB.find('button.t3-accordion__link')

        await buttonA.trigger('click')

        let contentWrapperA = itemA.find(
            'section.t3-accordion__content-wrapper'
        )

        expect(contentWrapperA.exists()).toBeTruthy()

        await buttonB.trigger('click')

        contentWrapperA = itemA.find('section.t3-accordion__content-wrapper')

        expect(contentWrapperA.exists()).toBeFalsy()

        const contentWrapperB = itemB.find(
            'section.t3-accordion__content-wrapper'
        )

        expect(contentWrapperB.exists()).toBeTruthy()
    })

    it('should show multiple items with multiple prop', async () => {
        const wrapper = mountFunction({ multiple: true })

        const items = wrapper.findAll('section.t3-accordion__item')

        const itemA = items.at(0)
        const itemB = items.at(1)

        const buttonA = itemA.find('button.t3-accordion__link')
        const buttonB = itemB.find('button.t3-accordion__link')

        await buttonA.trigger('click')

        let contentWrapperA = itemA.find(
            'section.t3-accordion__content-wrapper'
        )

        expect(contentWrapperA.exists()).toBeTruthy()

        await buttonB.trigger('click')

        contentWrapperA = itemA.find('section.t3-accordion__content-wrapper')

        expect(contentWrapperA.exists()).toBeTruthy()

        const contentWrapperB = itemB.find(
            'section.t3-accordion__content-wrapper'
        )

        expect(contentWrapperB.exists()).toBeTruthy()
    })
})
