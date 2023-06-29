<template>
    <div class="t3-ce-table">
        <T3Header
            class="t3-ce-table__header"
            :content="contentElement.content"
        />
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
