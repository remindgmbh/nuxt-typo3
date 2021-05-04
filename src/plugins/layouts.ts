import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import { registerBackendLayouts } from 'nuxt-typo3/lib/templates/plugins/layouts'
import BeDefault from '~rmnd-typo3/layouts/backend/BeDefault.vue'
import BeDynamic from '~rmnd-typo3/layouts/backend/BeDynamic'

const layouts = {
    BeDefault,
    BeDynamic,
}

const plugin: Plugin = (context) => {
    Vue.use(registerBackendLayouts, {
        context: context.app,
        layouts,
    })
}

export default plugin
