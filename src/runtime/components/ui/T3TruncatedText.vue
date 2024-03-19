<template>
    <div ref="root" class="t3-truncated-text">
        <div ref="content" class="t3-truncated-text__content">
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { debounce } from 'perfect-debounce'

const root = ref<HTMLDivElement>()
const content = ref<HTMLDivElement>()

const lines = ref<number>(0)

onMounted(() => {
    const resizeObserver = new ResizeObserver(
        debounce(() => {
            const lineHeight = getLineHeight()
            const contentHeight = getContentHeight()
            if (lineHeight && contentHeight) {
                lines.value = Math.floor(contentHeight / lineHeight)
            }
        }, 50),
    )

    if (root.value) {
        resizeObserver.observe(root.value)
    }
})

function getContentHeight() {
    if (content.value && root.value) {
        const temp = document.createElement(content.value.nodeName)
        temp.innerHTML = content.value.innerHTML
        root.value.appendChild(temp)
        const result = root.value.clientHeight
        root.value.removeChild(temp)
        return result
    }
}

function getLineHeight() {
    if (content.value && root.value) {
        const temp = document.createElement(content.value.nodeName)

        temp.style.margin = '0px'
        temp.style.padding = '0px'
        temp.style.fontFamily = content.value.style.fontFamily
        temp.style.fontSize = content.value.style.fontSize

        // Add nbsp as html
        temp.innerHTML = String.fromCharCode(160)
        root.value.appendChild(temp)
        const result = temp.clientHeight
        root.value.removeChild(temp)
        return result
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
        -webkit-line-clamp: v-bind(lines);

        // HTML in slot must not contain multiple font sizes, line heights or margin/padding in order to work
        * {
            font-size: inherit !important;
            line-height: inherit !important;
            padding: 0 !important;
            margin: 0 !important;
        }
    }
}
</style>
