<template>
    <component :is="tag" ref="container" class="t3-auto-height-container">
        <div ref="content" class="t3-auto-height-container__content">
            <slot />
        </div>
    </component>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { onMounted, ref } from 'vue'

withDefaults(
    defineProps<{
        tag?: keyof HTMLElementTagNameMap
    }>(),
    { tag: 'div' }
)

const container = ref<HTMLElement>()
const content = ref<HTMLElement>()

onMounted(() => {
    const resizeObserver = new ResizeObserver(() => {
        container.value!.style.height = `${content.value!.scrollHeight}px`
    })
    resizeObserver.observe(content.value!)
})
</script>

<style lang="scss">
.t3-auto-height-container {
    overflow: hidden;
}
</style>
