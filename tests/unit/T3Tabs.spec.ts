import { mount, createLocalVue } from '@vue/test-utils'
import T3Tabs from '~rmnd-typo3/components/ui/T3Tabs/T3Tabs'
import T3ResponsiveHeightContainer from '~rmnd-typo3/components/util/T3ResponsiveHeightContainer/T3ResponsiveHeightContainer'

describe('T3Tabs', () => {
    beforeEach(() => {
        Object.defineProperty(global, 'ResizeObserver', {
            writable: true,
            value: jest.fn().mockImplementation(() => ({
                observe: jest.fn(),
                unobserve: jest.fn(),
                disconnect: jest.fn(),
            })),
        })
    })

    const localVue = createLocalVue()
    localVue.component(
        'T3ResponsiveHeightContainer',
        T3ResponsiveHeightContainer
    )

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

        return mount(T3Tabs, {
            localVue,
            propsData: { items: itemsArray, ...props },
            scopedSlots: {
                title: ({ item }) => item.title,
                content: ({ item }) => item.content,
            },
        })
    }

    it('should show first item', () => {
        const wrapper = mountFunction()

        const button = wrapper.find('button.t3-tabs__link')
        const content = wrapper.find('section.t3-tabs__content')

        const title = button.text()
        const expectedContentText = items[title]

        const actualContentText = content.text()

        expect(actualContentText).toMatch(expectedContentText)
    })

    it('should show second item after click', async () => {
        const wrapper = mountFunction()

        const button = wrapper.findAll('button.t3-tabs__link').at(1)

        await button.trigger('click')

        const content = wrapper.find('section.t3-tabs__content')

        const title = button.text()
        const expectedContentText = items[title]

        const actualContentText = content.text()

        expect(actualContentText).toMatch(expectedContentText)
    })
})
