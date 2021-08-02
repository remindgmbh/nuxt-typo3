<template>
    <div class="ce-accordion">
        <CeHeader v-bind="$props" />
        <RAccordion :items="items">
            <template #title="{ item }">{{
                item.content.gridElementTitle
            }}</template>
            <template #content="{ item }">
                <ce-dynamic :data="item" :type="item.type" />
            </template>
        </RAccordion>
    </div>
</template>
<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import baseCe from 'nuxt-typo3/lib/templates/components/content/mixins/baseCe'

@Component({ name: 'CeAccordion' })
export default class CeAccordion extends mixins(baseCe) {
    @Prop({ type: Array, required: true })
    items!: unknown[]
}
</script>
