import { ModuleOptions, CONFIG_KEY } from '../../module'

declare module '@nuxt/schema' {
    interface PublicRuntimeConfig {
        [CONFIG_KEY]: ModuleOptions
    }
}
// It is always important to ensure you import/export something when augmenting a type
export {}
