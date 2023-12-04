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
import { useT3Accordion } from '#imports'

const props = withDefaults(
    defineProps<{
        items: any[]
        multiple?: boolean
        initialActiveItems?: number[]
        disabledItems?: number[]
    }>(),
    { initialActiveItems: () => [], disabledItems: () => [] },
)

const { activeItems, toggle } = useT3Accordion(
    props.initialActiveItems,
    props.disabledItems,
    props.multiple,
)
</script>
