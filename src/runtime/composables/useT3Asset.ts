import type * as T3Model from '../models'
import { type Ref, computed } from 'vue'
import { useT3Config } from '#imports'

export function useT3Asset(asset: Ref<T3Model.Typo3.Asset>) {
    const config = useT3Config()

    function getImageUrl(
        fileExtension?: string,
        maxWidth?: number,
        maxHeight?: number,
        breakpoint?: string,
    ) {
        const url = new URL('image', config.api.baseUrl)
        url.searchParams.append(
            'uid',
            asset.value.properties.fileReferenceUid.toString(),
        )
        url.searchParams.append(
            'fileExtension',
            fileExtension ?? config.imageFileExtension,
        )

        if (maxWidth) {
            url.searchParams.append('maxWidth', maxWidth.toString())
        }

        if (maxHeight) {
            url.searchParams.append('maxHeight', maxHeight.toString())
        }

        if (breakpoint) {
            url.searchParams.append('breakpoint', breakpoint)
        }

        return url.toString()
    }

    const type = computed<string>(() => {
        switch (asset.value.properties.type) {
            case 'video': {
                if (
                    ['youtube', 'vimeo'].includes(
                        asset.value.properties.extension,
                    )
                ) {
                    return 'video-embedded'
                }
                return 'video'
            }
            case 'audio':
                return 'audio'
            case 'image':
                if (asset.value.properties.extension === 'svg') {
                    return 'svg'
                }
                return 'image'
            default:
                return 'default'
        }
    })

    return {
        type,

        getImageUrl,
    }
}
