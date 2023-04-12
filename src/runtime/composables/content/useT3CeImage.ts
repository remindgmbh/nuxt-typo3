import { computed } from 'vue'
import * as T3Api from '../../api'
import * as T3Model from '../../model'
import { useT3Breakpoints, useT3Config } from '#imports'

export function useT3CeImage(
    contentElement: T3Api.ContentElement<T3Api.Content.Image>
) {
    const { breakpointsAsc } = useT3Breakpoints()
    const config = useT3Config().contentElements.image

    const image = computed<T3Api.Asset | undefined>(() =>
        contentElement.content.images.at(0)
    )

    const imageAttrs = computed(() => ({
        sizes: config?.images?.responsive === false ? undefined : sizes.value,
        fileExtension: config?.images?.fileExtension,
    }))

    const sizes = computed<T3Model.ImageSizes>(() =>
        breakpointsAsc.value.reduce((result, breakpoint) => {
            result[breakpoint.name] = breakpoint.containerMaxWidth
                ? `${breakpoint.containerMaxWidth}px`
                : '100vw'
            return result
        }, {} as T3Model.ImageSizes)
    )

    return { image, imageAttrs }
}
