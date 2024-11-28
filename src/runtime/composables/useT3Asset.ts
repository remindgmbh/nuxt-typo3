import { type Ref, computed } from 'vue'
import { type T3Model, useAppConfig } from '#imports'

export function useT3Asset(asset: Ref<T3Model.Typo3.Asset.Base>) {
    const { typo3: config } = useAppConfig()

    function getAssetUrl(
        fileExtension?: string,
        maxWidth?: number,
        maxHeight?: number,
        breakpoint?: string,
        crop?: string,
    ) {
        const url = new URL('asset', config.api.baseUrl)

        // uidLocal may be null while fileReferenceUid contains the actual file uid
        // see: https://github.com/TYPO3-Headless/headless/pull/761
        url.searchParams.append(
            asset.value.uidLocal ? 'uid' : 'uidLocal',
            asset.value.fileReferenceUid.toString(),
        )

        if (asset.value.type === 'image' && asset.value.extension !== 'mixed') {
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

        if (crop) {
            url.searchParams.append('crop', crop)
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
