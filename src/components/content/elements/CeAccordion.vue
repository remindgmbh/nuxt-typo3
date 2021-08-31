<template>
    <div class="ce-accordion">
        <CeHeader v-bind="$props" />
        <RAccordion :items="items">
            <template #title="{ item }">{{
                item.content.gridElementTitle
            }}</template>
            <template #content="{ item }">
                <CeDynamic :data="item" :type="item.type" />
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

<style lang="scss">
.ce-accordion {
    & > .ce-header {
        padding: var(--ce-wrapper-padding-y) var(--ce-wrapper-padding-x);
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
