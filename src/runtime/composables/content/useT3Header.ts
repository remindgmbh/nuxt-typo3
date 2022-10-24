import { computed } from 'vue'
import { T3Api } from '#nuxt-typo3'

export function useT3Header(content: T3Api.Content.Base) {
    const visible = computed(
        () => content.header && content.headerLayout !== 100
    )

    const tag = computed(() =>
        content.headerLayout > 0 && content.headerLayout < 6
            ? `h${content.headerLayout}`
            : 'div'
    )

    return {
        tag,
        visible,
    }
}
