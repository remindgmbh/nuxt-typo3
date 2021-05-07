import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import CeBackground from '~rmnd-typo3/components/content/CeBackground/CeBackground'
import CeBreadcrumbs from '~rmnd-typo3/components/content/CeBreadcrumbs/CeBreadcrumbs'
import CeFrame from '~rmnd-typo3/components/content/CeFrame/CeFrame'
import CeRenderer from '~rmnd-typo3/components/content/CeRenderer/CeRenderer'
import CeWrapper from '~rmnd-typo3/components/content/CeWrapper/CeWrapper'

const components = {
    CeBackground,
    CeBreadcrumbs,
    CeWrapper,
    CeRenderer,
    CeFrame,
}

const plugin: Plugin = ({ app }) => {
    Object.keys(components).forEach((key) => {
        if (app.components) {
            Vue.component(key, components[key])
            app.components[key] = components[key]
        }
    })
}

export default plugin
