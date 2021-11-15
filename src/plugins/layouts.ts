import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import { registerBackendLayouts } from 'nuxt-typo3/lib/templates/plugins/layouts'
import * as layouts from '~rmnd-typo3/layouts/backend'

const plugin: Plugin = (context) => {
    Vue.use(registerBackendLayouts, {
        context: context.app,
        layouts,
    })
}

export default plugin
