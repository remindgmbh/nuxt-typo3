import type * as T3Model from '../models'
import type { CONFIG_KEY } from '../../module'

declare module 'nuxt/schema' {
    interface PublicRuntimeConfig {
        [CONFIG_KEY]: T3Model.Config.PublicRuntimeConfig
    }

    interface AppConfigInput {
        [CONFIG_KEY]: T3Model.Config.AppConfigInput
    }

    interface AppConfig {
        [CONFIG_KEY]: T3Model.Config.AppConfig
    }
}

declare module '@nuxt/schema' {
    interface PublicRuntimeConfig {
        [CONFIG_KEY]: T3Model.Config.PublicRuntimeConfig
    }

    interface AppConfigInput {
        [CONFIG_KEY]: T3Model.Config.AppConfigInput
    }

    interface AppConfig {
        [CONFIG_KEY]: T3Model.Config.AppConfig
    }
}

// It is always important to ensure you import/export something when augmenting a type
export {}
