<template>
    <div class="ce-header-slider">
        <CeHeader v-bind="$props" />
        <div>No default rendering for CeHeaderSlider available</div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import baseCe from 'nuxt-typo3/lib/templates/components/content/mixins/baseCe'

@Component({
    name: 'CeHeaderSlider',
})
export default class CeHeaderSlider extends mixins(baseCe) {
    @Prop({ type: Array, required: true })
    items!: unknown[]
}
</script>

<style lang="scss"></style>
