<template>
    <div class="t3-accordion">
        <section
            v-for="(item, index) in items"
            :key="index"
            class="t3-accordion__item"
        >
            <button
                class="t3-accordion__link"
                :class="{
                    't3-accordion__link--active': activeItems.includes(index),
                }"
                type="button"
                @click="toggle(index)"
            >
                <slot name="title" :item="item" :index="index" />
            </button>
            <T3CollapseTransition v-if="!disabledItems.includes(index)">
                <section
                    v-show="activeItems.includes(index)"
                    class="t3-accordion__content-wrapper"
                >
                    <div class="t3-accordion__content">
                        <slot name="content" :item="item" :index="index" />
                    </div>
                </section>
            </T3CollapseTransition>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
    defineProps<{
        items: any[]
        multiple?: boolean
        initialActiveItems?: number[]
        disabledItems?: number[]
    }>(),
    { initialActiveItems: () => [], disabledItems: () => [] }
)

const activeItems = ref<number[]>([])

activeItems.value.push(...props.initialActiveItems)

function toggle(index: number): void {
    if (props.disabledItems.includes(index)) {
        return
    }
    if (activeItems.value.includes(index)) {
        activeItems.value.splice(activeItems.value.indexOf(index), 1)
    } else if (props.multiple) {
        activeItems.value.push(index)
    } else {
        activeItems.value = [index]
    }
}
</script>

<style lang="scss">
@use '#nuxt-typo3/assets/styles/transition-durations' as transition-durations;

.t3-accordion {
    .collapse-transition {
        &-enter-active,
        &-leave-active {
            transition: height transition-durations.$accordion;
        }
    }
}
</style>
