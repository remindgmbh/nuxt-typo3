import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import CeHeader from '~rmnd-typo3/components/content/elements/CeHeader/CeHeader'
import CeStructuredContent from '~rmnd-typo3/components/content/elements/CeStructuredContent/CeStructuredContent.vue'
import CeTabs from '~rmnd-typo3/components/content/elements/CeTabs/CeTabs.vue'
import CeAccordion from '~rmnd-typo3/components/content/elements/CeAccordion/CeAccordion.vue'
import CeBackground from '~rmnd-typo3/components/content/CeBackground/CeBackground'
import CeBreadcrumbs from '~rmnd-typo3/components/content/CeBreadcrumbs/CeBreadcrumbs'
import CeFrame from '~rmnd-typo3/components/content/CeFrame/CeFrame'
import CeRenderer from '~rmnd-typo3/components/content/CeRenderer/CeRenderer'
import CeWrapper from '~rmnd-typo3/components/content/CeWrapper/CeWrapper'
import CeTextpic from '~rmnd-typo3/components/content/elements/CeTextpic/CeTextpic'
import CeHeaderSlider from '~rmnd-typo3/components/content/elements/CeHeaderSlider/CeHeaderSlider.vue'
import MediaImage from '~rmnd-typo3/components/content/elements/MediaImage'
import NavigationSidebar from '~rmnd-typo3/components/layout/NavigationSidebar.vue'
import NavigationSidebars from '~rmnd-typo3/components/layout/NavigationSidebars.vue'

const components = {
    CeHeader,
    CeStructuredContent,
    CeTabs,
    CeAccordion,
    CeBackground,
    CeBreadcrumbs,
    CeWrapper,
    CeRenderer,
    CeFrame,
    CeTextpic,
    CeHeaderSlider,
    MediaImage,
    NavigationSidebar,
    NavigationSidebars,
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
