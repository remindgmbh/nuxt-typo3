import { computed } from 'vue'
import { Content } from '#nuxt-typo3/api'

export function useCeHeader(
    props: Readonly<{
        id: number
        content: Content
    }>
) {
    const visible = computed(
        () => props.content.header && props.content.headerLayout !== 100
    )

    const tag = computed(() =>
        props.content.headerLayout > 0 && props.content.headerLayout < 6
            ? `h${props.content.headerLayout}`
            : 'div'
    )

    return {
        tag,
        visible,
    }
}
