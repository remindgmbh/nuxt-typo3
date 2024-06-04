import type * as T3Model from '../models'
import { type Ref, computed } from 'vue'
import { useT3Config } from '#imports'

export function useT3Asset(asset: Ref<T3Model.Typo3.Asset.Base>) {
    const config = useT3Config()

    function getAssetUrl(
        fileExtension?: string,
        maxWidth?: number,
        maxHeight?: number,
        breakpoint?: string,
    ) {
        const url = new URL('asset', config.api.baseUrl)
        url.searchParams.append('uid', asset.value.fileReferenceUid.toString())

        if (asset.value.type === 'image') {
            url.searchParams.append(
                'fileExtension',
                fileExtension ?? config.imageFileExtension,
            )
        }

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
        switch (asset.value.type) {
            case 'video': {
                if (['youtube', 'vimeo'].includes(asset.value.extension)) {
                    return 'video-embedded'
                }
                return 'video'
            }
            case 'audio':
                return 'audio'
            case 'image':
                if (asset.value.extension === 'svg') {
                    return 'svg'
                }
                return 'image'
            default:
                return 'default'
        }
    })

    return {
        type,

        getAssetUrl,
    }
}
