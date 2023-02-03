import '@testing-library/jest-dom'
import { defu } from 'defu'
import { describe, expect, it } from 'vitest'
import { fireEvent, render, RenderOptions } from '@testing-library/vue'
import T3Accordion from '../../src/runtime/components/ui/T3Accordion.vue'
import T3CollapseTransition from '../../src/runtime/components/transition/T3CollapseTransition.vue'

const items = [
    { title: 'Title A', content: 'Content A' },
    { title: 'Title B', content: 'Content B' },
]

describe('T3Accordion', () => {
    const renderComponent = (options: RenderOptions = {}) =>
        render(
            T3Accordion,
            defu(options, {
                global: {
                    components: { T3CollapseTransition },
                },
                props: { items },
                slots: {
                    title: ({ item }) => item.title,
                    content: ({ item }) => item.content,
                },
            } as RenderOptions)
        )

    it('should render item title in title slot', () => {
        const { getByText } = renderComponent()

        for (const { title } of items) {
            const titleElement = getByText(title)
            expect(titleElement).exist.toBeTruthy()
        }
    })

    it('should not show content initially', () => {
        const { queryByText } = renderComponent()
        for (const { content } of items) {
            const contentElement = queryByText(content)

            // contentElement could be undefined (v-if) or invisible (v-show)
            if (contentElement) {
                expect(contentElement).not.toBeVisible()
            }
        }
    })

    it('should show item content defined in initialActiveItems', () => {
        const initialActiveItemIndex = 1
        const initialActiveItemContent = items[initialActiveItemIndex].content

        const { queryByText } = renderComponent({
            props: { initialActiveItems: [initialActiveItemIndex] },
        })

        const content = queryByText(initialActiveItemContent)

        expect(content).toBeVisible()
    })

    it('should show item after click and hide after another click', async () => {
        const { getByText } = renderComponent()

        const { content, title } = items[0]

        const titleElement = getByText(title)

        await fireEvent.click(titleElement)

        const contentElement = getByText(content)

        expect(contentElement).toBeVisible()

        await fireEvent.click(titleElement)

        if (contentElement) {
            expect(contentElement).not.toBeVisible()
        }
    })

    it('should not show item defined in disabled items', async () => {
        const disabledItem = 1
        const { content: disabledItemContent, title: disabledItemTitle } =
            items[disabledItem]

        const { getByText, queryByText } = renderComponent({
            props: { disabledItems: [disabledItem] },
        })

        const titleElement = getByText(disabledItemTitle)

        await fireEvent.click(titleElement)

        const contentElement = queryByText(disabledItemContent)

        if (contentElement) {
            expect(contentElement).not.toBeVisible()
        }
    })

    it('should hide item after another one is opened', async () => {
        const { getByText } = renderComponent()

        const { content: content0, title: title0 } = items[0]
        const { content: content1, title: title1 } = items[1]

        const title0Element = getByText(title0)
        const title1Element = getByText(title1)

        await fireEvent.click(title0Element)

        const content0Element = getByText(content0)

        expect(content0Element).toBeVisible()

        await fireEvent.click(title1Element)

        const content1Element = getByText(content1)

        expect(content1Element).toBeVisible()

        if (content0Element) {
            expect(content0Element).not.toBeVisible()
        }
    })

    it('should show multiple items with multiple prop', async () => {
        const { getByText } = renderComponent({ props: { multiple: true } })

        const { content: content0, title: title0 } = items[0]
        const { content: content1, title: title1 } = items[1]

        const title0Element = getByText(title0)
        const title1Element = getByText(title1)

        await fireEvent.click(title0Element)
        await fireEvent.click(title1Element)

        const content0Element = getByText(content0)

        expect(content0Element).toBeVisible()

        const content1Element = getByText(content1)

        expect(content1Element).toBeVisible()
    })
})
