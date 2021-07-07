<template>
    <div class="ce-structured-content">
        <CeHeader v-bind="$props" />
        <RAccordion v-if="isAccordion" :items="items">
            <template #title="{ item }">{{
                item.content.gridElementTitle
            }}</template>
            <template #content="{ item }">
                <ce-dynamic :data="item" :type="item.type" />
            </template>
        </RAccordion>
        <RTabs v-if="isTabs" :items="items">
            <template #title="{ item }">{{
                item.content.gridElementTitle
            }}</template>
            <template #content="{ item }">
                <ce-dynamic :data="item" :type="item.type" />
            </template>
        </RTabs>
    </div>
</template>
<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import baseCe from 'nuxt-typo3/lib/templates/components/content/mixins/baseCe'
import { Structure } from '../../../../api/structure'

@Component({ name: 'CeStructuredContent' })
export default class CeStructuredContent extends mixins(baseCe) {
    @Prop({ type: Object, required: true })
    structure!: Structure

    get isAccordion(): boolean {
        return this.structure.layout === 'accordion'
    }

    get isTabs(): boolean {
        return this.structure.layout === 'tabs'
    }

    get items(): unknown[] {
        const rows = this.structure.rows || []
        const columns = rows.length > 0 ? rows[0].columns : []
        return columns.length > 0 ? columns[0].elements : []
    }
}
</script>
