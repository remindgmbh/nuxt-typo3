import { ModuleOptions } from '../../module'

declare module '@nuxt/schema' {
    interface PublicRuntimeConfig {
        typo3: ModuleOptions
    }
}
// It is always important to ensure you import/export something when augmenting a type
export {}
