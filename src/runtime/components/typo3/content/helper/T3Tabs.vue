<template>
    <section class="t3-tabs">
        <div class="t3-tabs__links">
            <button
                v-for="(item, index) in props.items"
                :key="index"
                class="t3-tabs__link"
                :class="{ 't3-tabs__link--active': activeItemIndex === index }"
                @click="toggle(index)"
            >
                <slot name="title" :item="item" :index="index" />
            </button>
        </div>
        <T3AutoHeightContainer class="t3-tabs__contents">
            <transition v-bind="transition">
                <section :key="activeItemIndex" class="t3-tabs__content">
                    <slot
                        name="content"
                        :item="activeItem"
                        :index="activeItemIndex"
                    />
                </section>
            </transition>
        </T3AutoHeightContainer>
    </section>
</template>

<script setup lang="ts" generic="T">
import { type TransitionProps } from 'vue'
import { useT3Tabs } from '#imports'

defineSlots<{
    title(props: { item: T; index: number }): any
    content(props: { item: T; index: number }): any
}>()

const props = withDefaults(
    defineProps<{
        items: T[]
        transition?: TransitionProps
    }>(),
    {
        transition: () => ({
            mode: 'out-in',
            name: 'tab-change-transition',
        }),
    },
)

const { activeItem, activeItemIndex, toggle } = useT3Tabs(props.items)
</script>
