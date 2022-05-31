<template>
    <component :is="tag" ref="container" class="t3-auto-height-container">
        <div ref="content" class="t3-auto-height-container__content">
            <slot />
        </div>
    </component>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, Ref } from 'vue'

withDefaults(
    defineProps<{
        tag?: keyof HTMLElementTagNameMap
    }>(),
    { tag: 'div' }
)

const container = ref<HTMLElement>() as Ref<HTMLElement>
const content = ref<HTMLElement>() as Ref<HTMLElement>

let resizeObserver: ResizeObserver | undefined

onMounted(() => {
    resizeObserver = new ResizeObserver(() => {
        container.value.style.height = `${content.value.scrollHeight}px`
    })
    resizeObserver.observe(content.value)
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
