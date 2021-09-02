import Vue from 'vue'
import { Plugin } from '@nuxt/types'
// Content Helper
import CeBackground from '~rmnd-typo3/components/content/helper/CeBackground/CeBackground'
import CeBreadcrumbs from '~rmnd-typo3/components/content/helper/CeBreadcrumbs/CeBreadcrumbs'
import CeFrame from '~rmnd-typo3/components/content/helper/CeFrame/CeFrame'
import CeRenderer from '~rmnd-typo3/components/content/helper/CeRenderer/CeRenderer'
import CeWrapper from '~rmnd-typo3/components/content/helper/CeWrapper/CeWrapper'

// Content Elements
import CeAccordion from '~rmnd-typo3/components/content/elements/CeAccordion.vue'
import CeHeader from '~rmnd-typo3/components/content/elements/CeHeader.vue'
import CeImage from '~rmnd-typo3/components/content/elements/CeImage.vue'
import CeStructuredContent from '~rmnd-typo3/components/content/elements/CeStructuredContent.vue'
import CeTabs from '~rmnd-typo3/components/content/elements/CeTabs.vue'
import CeTextpic from '~rmnd-typo3/components/content/elements/CeTextpic.vue'

// UI
import RAccordion from '~rmnd-typo3/components/ui/RAccordion.vue'
import RMenu from '~rmnd-typo3/components/ui/RMenu.vue'
import RMenuContent from '~rmnd-typo3/components/ui/RMenuContent'
import RMenuTrigger from '~rmnd-typo3/components/ui/RMenuTrigger'
import RNavigationSidebar from '~rmnd-typo3/components/ui/RNavigationSidebar.vue'
import RNavigationSidebarItem from '~rmnd-typo3/components/ui/RNavigationSidebarItem.vue'
import RResponsiveHeightContainer from '~rmnd-typo3/components/ui/RResponsiveHeightContainer.vue'
import RTabs from '~rmnd-typo3/components/ui/RTabs.vue'
import RTopbarLayout from '~rmnd-typo3/components/ui/RTopbarLayout.vue'

// Transitions
import CollapseTransition from '~rmnd-typo3/components/transitions/CollapseTransition'

// Util
import RImage from '~rmnd-typo3/components/util/RImage'
import RTypolink from '~rmnd-typo3/components/util/RTypolink'

const components = {
    // Content Helper
    CeBackground,
    CeBreadcrumbs,
    CeFrame,
    CeRenderer,
    CeWrapper,
    // Content Elements
    CeAccordion,
    CeHeader,
    CeImage,
    CeStructuredContent,
    CeTabs,
    CeTextpic,
    // UI
    RAccordion,
    RMenu,
    RMenuContent,
    RMenuTrigger,
    RNavigationSidebar,
    RNavigationSidebarItem,
    RResponsiveHeightContainer,
    RTabs,
    RTopbarLayout,
    // Util
    RImage,
    RTypolink,
    // Transitions
    CollapseTransition,
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
