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
                <slot :index="index" :item="item" name="title"></slot>
            </button>
            <T3CollapseTransition v-show="!disabledItems.includes(index)">
                <section
                    v-show="activeItems.includes(index)"
                    class="t3-accordion__content-wrapper"
                >
                    <div class="t3-accordion__content">
                        <slot :index="index" :item="item" name="content"></slot>
                    </div>
                </section>
            </T3CollapseTransition>
        </section>
    </div>
</template>

<script setup lang="ts" generic="T">
import { useT3Accordion } from '#imports'

const props = withDefaults(
    defineProps<{
        items: T[]
        multiple?: boolean
        initialActiveItems?: number[]
        disabledItems?: number[]
    }>(),
    {
        disabledItems: () => [],
        initialActiveItems: () => [],
    },
)

defineSlots<{
    title(props: { item: T; index: number }): any
    content(props: { item: T; index: number }): any
}>()

const { activeItems, toggle } = useT3Accordion(
    props.initialActiveItems,
    props.disabledItems,
    props.multiple,
)
</script>
