import type * as T3Model from '../../models'
import { computed } from 'vue'

export function useT3Header(content: T3Model.Typo3.Content.Data.Header) {
    const visible = computed<boolean>(
        () => !!content.header && content.headerLayout !== 100,
    )

    const tag = computed<string>(() =>
        content.headerLayout > 0 && content.headerLayout < 6
            ? `h${content.headerLayout}`
            : 'div',
    )

    return {
        tag,
        visible,
    }
}
