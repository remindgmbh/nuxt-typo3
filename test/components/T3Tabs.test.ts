import '@testing-library/jest-dom'
import { type RenderOptions, fireEvent, render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import T3AutoHeightContainer from '../../src/runtime/components/ui/T3AutoHeightContainer.vue'
import T3Tabs from '../../src/runtime/components/typo3/content/helper/T3Tabs.vue'
import { defu } from 'defu'

const items = [
    {
        content: 'Content A',
        title: 'Title A',
    },
    {
        content: 'Content B',
        title: 'Title B',
    },
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
                    content: ({ item }) => item.content,
                    title: ({ item }) => item.title,
                },
            } as RenderOptions),
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
        const [{ content }] = items
        const contentElement = getByText(content)
        expect(contentElement).toBeVisible()
    })

    it('should show second item after click', async () => {
        const { getByText } = renderComponent()
        const [, { content, title }] = items
        const titleElement = getByText(title)

        await fireEvent.click(titleElement)

        const contentElement = getByText(content)
        expect(contentElement).toBeVisible()
    })
})
