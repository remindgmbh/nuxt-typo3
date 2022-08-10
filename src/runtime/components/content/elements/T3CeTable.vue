<template>
    <div
        class="t3-ce-table"
        :class="{
            [`t3-ce-table--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3CeHeader :content-element="contentElement" />

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
import { Api, useCeTable } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: Api.ContentElement<Api.Content.Table>
}>()

const { headerLeft, headerTop, tbody, tfoot, thead } = useCeTable(
    props.contentElement.content
)
</script>
