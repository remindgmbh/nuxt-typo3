import '@testing-library/jest-dom'
import { describe, expect, it } from 'vitest'
import { fireEvent, render, RenderOptions } from '@testing-library/vue'
import { defu } from 'defu'
import T3Modal from '../../src/runtime/components/ui/T3Modal.vue'

const modalContent = 'Modal Content'

describe('T3Modal', () => {
    const renderComponent = (options: RenderOptions = {}) =>
        render(
            T3Modal,
            defu(options, {
                props: { modelValue: false },
                slots: { default: modalContent },
            } as RenderOptions)
        )

    it('should not show modal initially', () => {
        const { queryByText } = renderComponent()

        const contentElement = queryByText(modalContent)

        if (contentElement) {
            expect(contentElement).not.toBeVisible()
        }
    })

    it('should show modal after setting value to true', async () => {
        const { getByText, rerender } = renderComponent()

        await rerender({ modelValue: true })

        const contentElement = getByText(modalContent)

        expect(contentElement).toBeVisible()
    })

    it('should hide modal after setting value to false', async () => {
        const { queryByText, rerender } = renderComponent({
            props: { modelValue: true },
        })

        await rerender({ modelValue: false })

        const contentElement = queryByText(modalContent)

        if (contentElement) {
            expect(contentElement).not.toBeVisible()
        }
    })

    it('should not hide modal on background click without closeOnOutsideClick set', async () => {
        const { emitted, getByTestId, getByText } = renderComponent({
            props: { modelValue: true },
        })

        const background = getByTestId('background')

        expect(background).exist.toBeTruthy()

        await fireEvent.click(background)

        expect(emitted('update:modelValue')).toBeFalsy()

        const contentElement = getByText(modalContent)

        expect(contentElement).toBeVisible()
    })

    it('should hide modal on background click with closeOnOutsideClick set', async () => {
        const { emitted, getByTestId, queryByText, rerender } = renderComponent(
            {
                props: { modelValue: true, closeOnOutsideClick: true },
            }
        )

        const background = getByTestId('background')

        expect(background).toBeDefined()

        await fireEvent.click(background)

        const [[modelValue]] = emitted<[boolean]>('update:modelValue')

        await rerender({ modelValue })

        const contentElement = queryByText(modalContent)

        if (contentElement) {
            expect(contentElement).not.toBeVisible()
        }
    })

    it('should not hide modal on content click', async () => {
        const { emitted, getByText } = renderComponent({
            props: { modelValue: true, closeOnOutsideClick: true },
        })

        const contentElement = getByText(modalContent)

        await fireEvent.click(contentElement)

        expect(emitted('update:modelValue')).toBeFalsy()

        expect(contentElement).toBeVisible()
    })
})
