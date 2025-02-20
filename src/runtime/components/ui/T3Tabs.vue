<template>
    <section class="t3-tabs">
        <div class="t3-tabs__links" role="tablist">
            <button
                v-for="(item, index) in props.items"
                :id="getButtonId(index)"
                :key="getKey(index)"
                :aria-controls="getContentId(index)"
                :aria-selected="activeItemIndex === index"
                class="t3-tabs__link"
                :class="{ 't3-tabs__link--active': activeItemIndex === index }"
                type="button"
                @click="toggle(index)"
            >
                <slot
                    :index="index"
                    :is-active="index === activeItemIndex"
                    :item="item"
                    name="title"
                    :toggle="toggle"
                ></slot>
            </button>
        </div>
        <T3AutoHeightContainer class="t3-tabs__contents">
            <Transition v-bind="transition">
                <section
                    v-show="activeItemIndex !== undefined"
                    :id="getContentId(activeItemIndex ?? 0)"
                    :key="activeItemIndex"
                    :aria-labelledby="getButtonId(activeItemIndex ?? 0)"
                    class="t3-tabs__content"
                >
                    <slot
                        :index="activeItemIndex!"
                        :item="activeItem"
                        name="content"
                        :toggle="toggle"
                    ></slot>
                </section>
            </Transition>
        </T3AutoHeightContainer>
    </section>
</template>

<script setup lang="ts" generic="T">
import { toRef, useId, useT3Tabs } from '#imports'
import type { TransitionProps } from 'vue'

export interface Props<T> {
    id?: string
    initialActiveIndex?: number
    items: T[]
    transition?: TransitionProps
}

export interface Slots<T> {
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
}

const props = withDefaults(defineProps<Props<T>>(), {
    id: useId(),
    initialActiveIndex: 0,
    transition: () => ({
        mode: 'out-in',
        name: 'tab-change-transition',
    }),
})

defineSlots<Slots<T>>()

const {
    activeItem,
    activeItemIndex,
    getButtonId,
    getContentId,
    getKey,
    toggle,
} = useT3Tabs<T>(
    toRef(() => props.id),
    toRef(() => props.items),
    toRef(() => props.initialActiveIndex),
)
</script>
