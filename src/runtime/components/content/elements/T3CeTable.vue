<template>
    <div
        class="t3-ce-table"
        :class="{
            [`t3-ce-table--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3Header :content-element="contentElement" />
        <T3Table
            :caption="contentElement.content.tableCaption"
            :header-left="headerLeft"
            :header-top="headerTop"
            :tbody="tbody"
            :tfoot="tfoot"
            :thead="thead"
        />
    </div>
</template>

<script setup lang="ts">
import { T3Model, useT3CeTable } from '#imports'

const props = defineProps<{
    contentElement: T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Table>
}>()

const { headerLeft, headerTop, tbody, tfoot, thead } = useT3CeTable(
    props.contentElement.content
)
</script>
