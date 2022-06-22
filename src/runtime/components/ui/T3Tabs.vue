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
            <transition name="tab-change" mode="out-in">
                <section :key="activeItemIndex" class="t3-tabs__content">
                    <slot name="content" :item="activeItem" />
                </section>
            </transition>
        </T3AutoHeightContainer>
    </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
    items: any[]
}>()

const activeItemIndex = ref(0)

function toggle(index: number): void {
    activeItemIndex.value = index
}
const activeItem = computed(() => props.items.at(activeItemIndex.value))
</script>
