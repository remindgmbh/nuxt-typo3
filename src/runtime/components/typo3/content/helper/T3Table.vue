<template>
    <T3TableContainer>
        <table ref="table">
            <caption v-if="caption">
                {{
                    caption
                }}
            </caption>
            <thead v-if="thead">
                <tr>
                    <th v-for="(col, colKey) in thead" :key="colKey">
                        {{ col }}
                    </th>
                </tr>
            </thead>
            <tbody v-if="tbody">
                <tr v-for="(row, rowKey) in tbody" :key="rowKey">
                    <component
                        :is="headerLeft && colKey === 0 ? 'th' : 'td'"
                        v-for="(col, colKey) in row"
                        :key="colKey"
                        >{{ col }}</component
                    >
                </tr>
            </tbody>
            <tfoot v-if="tfoot">
                <tr>
                    <td v-for="(col, colKey) in tfoot" :key="colKey">
                        {{ col }}
                    </td>
                </tr>
            </tfoot>
        </table>
    </T3TableContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useT3TableEnhancer } from '#imports'

defineProps<{
    caption?: string
    headerLeft?: boolean
    tbody: string[][]
    tfoot?: string[]
    thead?: string[]
}>()

const table = ref<HTMLTableElement>()

useT3TableEnhancer(table)
</script>
