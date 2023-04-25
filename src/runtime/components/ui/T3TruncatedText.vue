<template>
    <div ref="root" class="t3-truncated-text">
        <div
            ref="content"
            class="t3-truncated-text__content"
            :style="{ '-webkit-line-clamp': lines }"
        >
            <slot />
        </div>
    </div>
</template>
<script setup lang="ts">
import { debounce } from 'perfect-debounce'
import { onMounted, ref } from 'vue'

const root = ref<HTMLDivElement>()
const content = ref<HTMLDivElement>()

const lines = ref<number>(0)

onMounted(() => {
    const resizeObserver = new ResizeObserver(
        debounce(() => {
            if (content.value && root.value) {
                const lineHeight = getLineHeight(content.value)
                lines.value = Math.floor(root.value.clientHeight / lineHeight)
            }
        }, 50)
    )

    if (root.value) {
        resizeObserver.observe(root.value)
    }
})

function getLineHeight(element: HTMLElement) {
    if (element.parentNode) {
        const temp = document.createElement(element.nodeName)

        temp.style.margin = '0px'
        temp.style.padding = '0px'
        temp.style.fontFamily = element.style.fontFamily
        temp.style.fontSize = element.style.fontSize

        // Add nbsp as html
        temp.innerHTML = String.fromCharCode(160)
        element.parentNode.appendChild(temp)
        const result = temp.clientHeight
        element.parentNode.removeChild(temp)
        return result
    } else {
        return 0
    }
}
</script>

<style lang="scss">
.t3-truncated-text {
    overflow: hidden;

    &__content {
        /* stylelint-disable-next-line value-no-vendor-prefix */
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}
</style>
