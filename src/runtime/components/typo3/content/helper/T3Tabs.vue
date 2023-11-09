<template>
    <section class="tabs">
        <div class="tabs__links">
            <button
                v-for="(item, index) in props.items"
                :key="index"
                class="tabs__link"
                :class="{ 'tabs__link--active': activeItemIndex === index }"
                @click="toggle(index)"
            >
                <slot name="title" :item="item" :index="index" />
            </button>
        </div>
        <T3AutoHeightContainer class="tabs__contents">
            <transition v-bind="transition">
                <section :key="activeItemIndex" class="tabs__content">
                    <slot name="content" :item="activeItem" />
                </section>
            </transition>
        </T3AutoHeightContainer>
    </section>
</template>

<script setup lang="ts">
import { type TransitionProps } from 'vue'
import { useT3Tabs } from '#imports'

const props = withDefaults(
    defineProps<{
        items: any[]
        transition?: TransitionProps
    }>(),
    {
        transition: () => ({
            name: 'tab-change-transition',
            mode: 'out-in',
        }),
    },
)

const { activeItem, activeItemIndex, toggle } = useT3Tabs(props.items)
</script>
