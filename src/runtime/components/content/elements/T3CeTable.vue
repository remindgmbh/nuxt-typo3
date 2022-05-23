<template>
    <div class="t3-ce-table">
        <T3CeHeader :id="id" :content="content" />
        <div class="t3-ce-table__container">
            <div
                class="t3-ce-table__overlay-left"
                :class="{ 't3-ce-table__overlay-left--visible': !left }"
            />
            <div
                class="t3-ce-table__overlay-right"
                :class="{ 't3-ce-table__overlay-right--visible': !right }"
            />
            <div ref="viewport" class="t3-ce-table__viewport">
                <table ref="table">
                    <caption v-if="content.tableCaption">
                        {{
                            content.tableCaption
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
                                :is="headerTop && colKey === 0 ? 'th' : 'td'"
                                v-for="(col, colKey) in row"
                                :key="colKey"
                            >
                                {{ col }}
                            </component>
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
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ContentTable } from '#nuxt-typo3/api'
import { useCeTable } from '#nuxt-typo3/composables/content-elements/useCeTable'

const props = defineProps<{
    id: number
    content: ContentTable
}>()

const table = ref<HTMLTableElement>()
const viewport = ref<HTMLDivElement>()

const { headerTop, left, right, thead, tbody, tfoot } = useCeTable(
    props,
    table,
    viewport
)
</script>

<style lang="scss">
@use '#nuxt-typo3/assets/styles/variables' as *;

.t3-ce-table {
    $viewport-z-index: 0;

    &__container {
        position: relative;
    }

    &__viewport {
        overflow-x: auto;
        position: relative;
        z-index: $viewport-z-index;
    }

    @mixin table-overlay-background($side) {
        background: linear-gradient(
            to $side,
            rgb(255 255 255 / 0%) 0%,
            $color-background 100%
        );
    }

    &__overlay-left,
    &__overlay-right {
        content: '';
        top: 0;
        position: absolute;
        width: 0;
        height: 100%;
        transition: width 0.5s;
        z-index: $viewport-z-index + 1;

        &--visible {
            width: 4rem;
        }
    }

    &__overlay-left {
        @include table-overlay-background(left);

        left: 0;
    }

    &__overlay-right {
        @include table-overlay-background(right);

        right: 0;
    }
}
</style>
