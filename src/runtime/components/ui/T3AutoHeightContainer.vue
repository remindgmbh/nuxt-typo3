<template>
    <component :is="tag" ref="container" class="t3-auto-height-container">
        <div ref="content" class="t3-auto-height-container__content">
            <slot></slot>
        </div>
    </component>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

export interface Props {
    tag?: keyof HTMLElementTagNameMap
}

export interface Slots {
    default(): any
}

withDefaults(defineProps<Props>(), { tag: 'div' })
defineSlots<Slots>()

const container = ref<HTMLElement>()
const content = ref<HTMLElement>()

let resizeObserver: ResizeObserver | undefined

onMounted(() => {
    resizeObserver = new ResizeObserver(() => {
        if (container.value && content.value) {
            container.value.style.height = `${content.value.scrollHeight}px`
        }
    })
    if (content.value) resizeObserver.observe(content.value)
})

onBeforeUnmount(() => {
    resizeObserver?.disconnect()
})
</script>

<style lang="scss">
.t3-auto-height-container {
    overflow: hidden;
}
</style>
