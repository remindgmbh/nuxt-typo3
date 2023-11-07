<template>
    <div class="ce-table">
        <component
            :is="Header"
            class="ce-table__header"
            :content="contentElement.content"
        />
        <component
            :is="Table"
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
import {
    T3Model,
    useT3CeTable,
    useT3Content,
    useT3DynamicComponent,
} from '#imports'
import { T3Header, T3Table } from '#components'

const { injectContentElement } = useT3Content()

const contentElement = injectContentElement<T3Model.Typo3.Content.Data.Table>()

const Header = useT3DynamicComponent<typeof T3Header>('Header')
const Table = useT3DynamicComponent<typeof T3Table>('Table')

const { headerLeft, headerTop, tbody, tfoot, thead } =
    useT3CeTable(contentElement)
</script>
