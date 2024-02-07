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
                <slot
                    :index="index"
                    :is-active="index === activeItemIndex"
                    :item="item"
                    name="title"
                    :toggle="toggle"
                />
            </button>
        </div>
        <T3AutoHeightContainer class="t3-tabs__contents">
            <transition v-bind="transition">
                <section
                    v-if="activeItemIndex !== undefined"
                    :key="activeItemIndex"
                    class="t3-tabs__content"
                >
                    <slot
                        :index="activeItemIndex"
                        :item="activeItem"
                        name="content"
                        :toggle="toggle"
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
    title(props: {
        isActive: boolean
        item: T
        index: number
        toggle: (index?: number) => void
    }): any
    content(props: {
        item: T | undefined
        index: number
        toggle: (index?: number) => void
    }): any
}>()

const props = withDefaults(
    defineProps<{
        initialActiveIndex?: number | null
        items: T[]
        transition?: TransitionProps
    }>(),
    {
        initialActiveIndex: 0,
        transition: () => ({
            mode: 'out-in',
            name: 'tab-change-transition',
        }),
    },
)

const { activeItem, activeItemIndex, toggle } = useT3Tabs<T>(
    props.items,
    props.initialActiveIndex ?? undefined,
)
</script>
