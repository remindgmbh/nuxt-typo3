import '@testing-library/jest-dom'
import { defu } from 'defu'
import { describe, expect, it } from 'vitest'
import { fireEvent, render, RenderOptions } from '@testing-library/vue'
import T3Tabs from '../../src/runtime/components/typo3/content/helper/T3Tabs.vue'
import T3AutoHeightContainer from '../../src/runtime/components/ui/T3AutoHeightContainer.vue'

const items = [
    { title: 'Title A', content: 'Content A' },
    { title: 'Title B', content: 'Content B' },
]

describe('T3Tabs', () => {
    const renderComponent = (options: RenderOptions = {}) =>
        render(
            T3Tabs,
            defu(options, {
                global: {
                    components: { T3AutoHeightContainer },
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

    it('should show first item initially', () => {
        const { getByText } = renderComponent()
        const { content } = items[0]
        const contentElement = getByText(content)
        expect(contentElement).toBeVisible()
    })

    it('should show second item after click', async () => {
        const { getByText } = renderComponent()
        const { content, title } = items[1]
        const titleElement = getByText(title)

        await fireEvent.click(titleElement)

        const contentElement = getByText(content)
        expect(contentElement).toBeVisible()
    })
})
