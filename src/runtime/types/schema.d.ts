import type * as T3Model from '../models'
import type { CONFIG_KEY, ModuleOptions } from '../../module'

declare module 'nuxt/schema' {
    interface PublicRuntimeConfig {
        [CONFIG_KEY]: ModuleOptions
    }

    interface AppConfigInput {
        [CONFIG_KEY]: T3Model.Config.AppConfigInput
    }

    interface AppConfig {
        [CONFIG_KEY]: T3Model.Config.AppConfigInput
    }
}

declare module '@nuxt/schema' {
    interface PublicRuntimeConfig {
        [CONFIG_KEY]: ModuleOptions
    }

    interface AppConfigInput {
        [CONFIG_KEY]: T3Model.Config.AppConfigInput
    }

    interface AppConfig {
        [CONFIG_KEY]: T3Model.Config.AppConfigInput
    }
}

// It is always important to ensure you import/export something when augmenting a type
export {}
