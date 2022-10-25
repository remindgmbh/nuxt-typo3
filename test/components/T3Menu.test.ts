import '@testing-library/jest-dom'
import { describe, expect, it } from 'vitest'
import { fireEvent, render, RenderOptions } from '@testing-library/vue'
import defu from 'defu'
import { h } from 'vue'
import T3Menu from '../../src/runtime/components/ui/T3Menu/T3Menu.vue'
import T3MenuDropdown from '../../src/runtime/components/ui/T3Menu/T3MenuDropdown.vue'
import T3MenuTrigger from '../../src/runtime/components/ui/T3Menu/T3MenuTrigger.vue'
import T3AutoHeightContainer from '../../src/runtime/components/ui/T3AutoHeightContainer.vue'
import T3CollapseTransition from '../../src/runtime/components/transition/T3CollapseTransition.vue'

const items = [
    {
        id: '1',
        title: 'Title 1',
        content: 'Content 1',
    },
    {
        id: '2',
        title: 'Title 2',
        content: 'Content 2',
    },
    {
        id: '3',
        title: 'Title 3',
        content: 'Content 3',
    },
]

describe('T3Menu', () => {
    const renderComponent = (options: RenderOptions = {}) =>
        render(
            T3Menu,
            defu(options, {
                slots: {
                    default: h('div', [
                        items.map((item) =>
                            h(
                                T3MenuTrigger,
                                { id: item.id },
                                { default: () => item.title }
                            )
                        ),
                        h(
                            T3MenuDropdown,
                            { items },
                            { default: ({ item }: any) => item.content }
                        ),
                    ]),
                },
                global: {
                    components: {
                        T3AutoHeightContainer,
                        T3CollapseTransition,
                    },
                },
            } as RenderOptions)
        )

    it('should not show dropdown without click', () => {
        const { queryByText } = renderComponent()

        for (const item of items) {
            const contentElement = queryByText(item.content)
            expect(contentElement).not.exist.toBeTruthy()
        }
    })

    it('should show dropdown on trigger click', async () => {
        const { getByText } = renderComponent()

        const item = items[0]

        const trigger = getByText(item.title)

        await fireEvent.click(trigger)

        const content = getByText(item.content)

        expect(content).exist.toBeTruthy()
    })

    it('should hide dropdown after another click', async () => {
        const { getByText, queryByText } = renderComponent()

        const item = items[0]

        const trigger = getByText(item.title)

        await fireEvent.click(trigger)
        await fireEvent.click(trigger)

        const content = queryByText(item.content)

        expect(content).not.exist.toBeTruthy()
    })

    it('should show dropdown and change content on other trigger click', async () => {
        const { getByText, queryByText } = renderComponent()

        const item1 = items[0]
        const item2 = items[1]

        const trigger1 = getByText(item1.title)
        const trigger2 = getByText(item2.title)

        await fireEvent.click(trigger1)

        let content1 = queryByText(item1.content)

        expect(content1).exist.toBeTruthy()

        await fireEvent.click(trigger2)

        content1 = queryByText(item1.content)

        expect(content1).not.exist.toBeTruthy()

        const content2 = queryByText(item2.content)

        expect(content2).exist.toBeTruthy()
    })

    it('should close dropdown on outside click', async () => {
        const { getByText, queryByText } = renderComponent()

        const item = items[0]

        const trigger = getByText(item.title)

        await fireEvent.click(trigger)

        let content = queryByText(item.content)

        expect(content).exist.toBeTruthy()

        await fireEvent.click(document)

        content = queryByText(item.content)

        expect(content).not.exist.toBeTruthy()
    })

    it('should not close dropdown on inside click', async () => {
        const { getByText } = renderComponent()

        const item = items[0]

        const trigger = getByText(item.title)

        await fireEvent.click(trigger)

        let content = getByText(item.content)

        expect(content).exist.toBeTruthy()

        await fireEvent.click(content)

        content = getByText(item.content)

        expect(content).exist.toBeTruthy()
    })
})
