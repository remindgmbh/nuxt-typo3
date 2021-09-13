import { Plugin } from '@nuxt/types'
import { Options } from '../options'

declare module 'vue/types/vue' {
    interface Vue {
        $rmndTypo3: Options
    }
}

declare module '@nuxt/types' {
    interface NuxtAppOptions {
        $rmndTypo3: Options
    }
    interface Context {
        $rmndTypo3: Options
    }
}

declare module 'vuex/types/index' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Store<S> {
        $rmndTypo3: Options
    }
}

const plugin: Plugin = (_context, inject) => {
    const options = JSON.parse('<%= JSON.stringify(options) %>')
    inject('rmndTypo3', options)
}

export default plugin
