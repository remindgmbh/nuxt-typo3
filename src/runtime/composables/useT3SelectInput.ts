import { Ref, computed, ref, toRaw } from 'vue'

export function useT3SelectInput<T>(
    select: (hoverOption: T) => void,
    options: Ref<T[]>
) {
    const hoverOption = ref<T>()
    const hoverOptionIndex = computed<number>(() =>
        options.value.findIndex(
            (value) => toRaw(hoverOption.value) === toRaw(value)
        )
    )

    function supportKeyboardNavigation(e: KeyboardEvent): void {
        // press down -> go next
        if (
            e.key === 'ArrowDown' &&
            hoverOptionIndex.value < options.value.length - 1
        ) {
            e.preventDefault() // prevent page scrolling
            hoverOption.value = options.value.at(hoverOptionIndex.value + 1)
        }

        // press up -> go previous
        if (e.key === 'ArrowUp' && hoverOptionIndex.value > 0) {
            e.preventDefault() // prevent page scrolling
            hoverOption.value = options.value.at(hoverOptionIndex.value - 1)
        }

        // press Enter or space -> select the option
        if (e.key === 'Enter' || e.key === ' ') {
            if (hoverOption.value !== undefined) {
                e.preventDefault()
                select(hoverOption.value)
            }
        }

        // press ESC -> close selectCustom
        if (e.key === 'Escape') {
            close()
        }
    }

    return { hoverOption, supportKeyboardNavigation }
}
