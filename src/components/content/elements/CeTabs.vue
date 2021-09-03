<template>
    <div class="ce-tabs">
        <CeHeader v-bind="$props" />
        <RTabs :items="items">
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

@Component({ name: 'CeTabs' })
export default class CeTabs extends mixins(baseCe) {
    @Prop({ type: Array, required: true })
    items!: unknown[]
}
</script>
<style lang="scss">
.ce-tabs {
    & > .ce-header {
        padding: var(--ce-wrapper-padding-y) var(--ce-wrapper-padding-x);
    }

    .r-tabs {
        &__link {
            padding: var(--ce-wrapper-padding-y) var(--ce-wrapper-padding-x);
        }

        &__content {
            padding: var(--ce-wrapper-padding-y) var(--ce-wrapper-padding-x);
        }
    }
}
</style>
