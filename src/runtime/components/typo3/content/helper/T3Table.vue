<template>
    <div class="t3-table">
        <div
            class="t3-table__overlay-left"
            :class="{ 't3-table__overlay-left--visible': !left }"
        />
        <div
            class="t3-table__overlay-right"
            :class="{ 't3-table__overlay-right--visible': !right }"
        />
        <div ref="viewport" class="t3-table__viewport">
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
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useT3Util } from '#imports'

const { detectScrollEnd } = useT3Util()

defineProps<{
    caption?: string
    headerLeft: boolean
    headerTop: boolean
    tbody: string[][]
    tfoot?: string[]
    thead?: string[]
}>()

const table = ref<HTMLTableElement>()
const viewport = ref<HTMLDivElement>()

const left = ref(true)
const right = ref(true)

onMounted(() => {
    if (table?.value && viewport?.value) {
        detectScrollEnd(
            table.value,
            'left',
            (detached) => (left.value = !detached),
            viewport.value,
        )

        detectScrollEnd(
            table.value,
            'right',
            (detached) => (right.value = !detached),
            viewport.value,
        )
    }
})
</script>

<style lang="scss">
.t3-table {
    $viewport-z-index: 0;

    position: relative;

    &__viewport {
        overflow-x: auto;
        position: relative;
        z-index: $viewport-z-index;
    }

    &__overlay-left,
    &__overlay-right {
        content: '';
        top: 0;
        position: absolute;
        width: 0;
        height: 100%;
        transition: width 0;
        z-index: $viewport-z-index + 1;
        pointer-events: none;

        &--visible {
            width: 0;
        }
    }

    &__overlay-left {
        // define background, for example:
        // background: linear-gradient(
        //     to left,
        //     rgb(255 255 255 / 0%) 0%,
        //     white 100%
        // );
        left: 0;
    }

    &__overlay-right {
        // define background, for example:
        // background: linear-gradient(
        //     to right,
        //     rgb(255 255 255 / 0%) 0%,
        //     white 100%
        // );
        right: 0;
    }
}
</style>
