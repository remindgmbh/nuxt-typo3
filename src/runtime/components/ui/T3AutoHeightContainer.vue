<template>
    <component :is="tag" ref="container" class="auto-height-container">
        <div ref="content" class="auto-height-container__content">
            <slot />
        </div>
    </component>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

withDefaults(
    defineProps<{
        tag?: keyof HTMLElementTagNameMap
    }>(),
    { tag: 'div' },
)

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
.auto-height-container {
    overflow: hidden;
}
</style>
