import type { CeOptions, Spacing } from './index'
import type { I18nOptions } from 'vue-i18n'
import type { Typo3 } from '../index'

export interface AppConfigInput {
    breadcrumbs?: {
        fullWidth?: boolean
        currentTitle?: string | ((pageData: Typo3.Page) => string | undefined)
    }
    // config for content elements, type key has to match CType
    contentElements?: {
        [type: string]: CeOptions | undefined
    }
    form?: {
        wrapper?: { [tag: string]: string[] }
        hideLabel?: string[]
        reverseOrder?: string[]
    }
    // options from https://github.com/intlify/vue-i18n-next
    i18n?: I18nOptions
    // global file extension for images coming from typo3
    // can be overwritten for specific content elements
    imageFileExtension?: string
    // language paths in addition to default language
    languages?: string[]
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
