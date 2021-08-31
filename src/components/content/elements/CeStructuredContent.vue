<template>
    <CeDynamic :data="contentData" :type="structure.layout"></CeDynamic>
</template>
<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import baseCe from 'nuxt-typo3/lib/templates/components/content/mixins/baseCe'
import { Structure } from '../../../api/structure'
import { Typolink } from '../../../api/typolink'

@Component({ name: 'CeStructuredContent' })
export default class CeStructuredContent extends mixins(baseCe) {
    @Prop({ type: Object, required: true })
    structure!: Structure

    // Props from baseCe, required for TypeScript
    id!: number
    header!: string
    headerLayout!: number
    headerPosition!: string
    date!: number
    headerLink!: string | Typolink
    subheader!: string

    get contentData(): unknown {
        return {
            id: this.id,
            type: this.structure.layout,
            content: {
                items: this.items,
                header: this.header,
                headerLayout: this.headerLayout,
                headerPosition: this.headerPosition,
                headerLink: this.headerLink,
                subheader: this.subheader,
            },
        }
    }

    get items(): unknown[] {
        const rows = this.structure.rows || []
        const columns = rows.length > 0 ? rows[0].columns : []
        return columns.length > 0 ? columns[0].elements : []
    }
}
</script>

<style lang="scss">
.ce-structured-content {
    & > .ce-header {
        padding: var(--ce-wrapper-padding-y) var(--ce-wrapper-padding-x);
    }

    .r-tabs {
        &__link {
            padding: var(--ce-wrapper-padding-y) var(--ce-wrapper-padding-x);
        }

        &__contents {
            padding: var(--ce-wrapper-padding-y) var(--ce-wrapper-padding-x);
        }
    }

    .r-accordion {
        &__link {
            padding: var(--ce-wrapper-padding-y) var(--ce-wrapper-padding-x);
        }

        &__content {
            padding: 0 var(--ce-wrapper-padding-x) var(--ce-wrapper-padding-y);
        }
    }
}
</style>
