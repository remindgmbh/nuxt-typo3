<template>
    <Transition
        :name="transitionName"
        @after-enter="resetStyles"
        @after-leave="resetStyles"
        @before-enter="onBeforeEnter"
        @before-leave="onBeforeLeave"
        @enter="onEnter"
        @enter-cancelled="resetStyles"
        @leave="onLeave"
        @leave-cancelled="resetStyles"
    >
        <slot></slot>
    </Transition>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        transitionName?: string
    }>(),
    { transitionName: 'collapse-transition' },
)

let initialHeight = ''
let initialOverflowY = ''

function onBeforeEnter(el: Element) {
    if (!(el instanceof HTMLElement)) return
    initialHeight = el.style.height
    initialOverflowY = el.style.overflowY
    el.style.height = '0'
}
function onEnter(el: Element) {
    if (!(el instanceof HTMLElement)) return
    el.style.overflowY = 'hidden'
    el.style.height = `${el.scrollHeight}px`
}
function onBeforeLeave(el: Element) {
    if (!(el instanceof HTMLElement)) return
    el.style.height = `${el.scrollHeight}px`
}
function onLeave(el: Element) {
    if (!(el instanceof HTMLElement)) return
    if (el.scrollHeight !== 0) {
        el.style.overflowY = 'hidden'
        el.style.height = '0'
    }
}
function resetStyles(el: Element) {
    if (!(el instanceof HTMLElement)) return
    el.style.height = initialHeight
    el.style.overflowY = initialOverflowY
}
</script>
