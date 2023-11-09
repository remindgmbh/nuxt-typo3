import type { I18nOptions } from 'vue-i18n'
import type { CeOptions, Spacing } from '.'

export interface AppConfigInput {
    // config for content elements, type key has to match CType
    contentElements?: {
        [type: string]: CeOptions | undefined
    }
    // options from https://github.com/intlify/vue-i18n-next
    i18n?: I18nOptions
    // global file extension for images coming from typo3
    // can be overwritten for specific content elements
    imageFileExtension?: string
    // language paths in addition to default language
    languages?: string[]
    layout?: {
        breadcrumbs: {
            // if set to true, breadcrumbs ignore container width
            fullWidth: boolean
        }
    }
    spacing?: Spacing
    theme?: {
        backgroundColors: {
            [theme: string]: {
                [backgroundColorName: string]: string
            }
        }
        default: string
    }
}
