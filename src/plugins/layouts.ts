import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import { registerBackendLayouts } from 'nuxt-typo3/lib/templates/plugins/layouts'
import BeDefault from '~rmnd-typo3/layouts/backend/BeDefault/BeDefault.vue'

const layouts = {
    BeDefault,
}

const plugin: Plugin = (context) => {
    Vue.use(registerBackendLayouts, {
        context: context.app,
        layouts,
    })
}

export default plugin
