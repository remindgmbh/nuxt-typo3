import type * as T3Model from '../models'
import { ModuleOptions, CONFIG_KEY } from '../../module'

declare module '@nuxt/schema' {
    interface PublicRuntimeConfig {
        [CONFIG_KEY]: ModuleOptions
    }

    interface AppConfigInput {
        [CONFIG_KEY]: T3Model.Config.AppConfigInput
    }

    interface AppConfig extends AppConfigInput {}
}
// It is always important to ensure you import/export something when augmenting a type
export {}
