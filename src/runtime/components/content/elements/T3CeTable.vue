<template>
    <div
        class="t3-ce-table"
        :class="{
            [`t3-ce-table--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3CeHeader :content-element="contentElement" />
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
                    <caption v-if="contentElement.content.tableCaption">
                        {{
                            contentElement.content.tableCaption
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
import { Api, useCeTable } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: Api.ContentElement<Api.Content.Table>
}>()

const table = ref<HTMLTableElement>()
const viewport = ref<HTMLDivElement>()

const { headerTop, left, right, thead, tbody, tfoot } = useCeTable(
    props.contentElement.content,
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
        transition: width $transition-duration-table-overlay;
        z-index: $viewport-z-index + 1;

        &--visible {
            width: $table-overlay-width;
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
