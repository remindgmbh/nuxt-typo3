<template>
    <transition
        :name="transitionName"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
    >
        <slot></slot>
    </transition>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        transitionName?: string
    }>(),
    { transitionName: 'collapse-transition' }
)

let initialHeight = ''
let initialOverflowY = ''

function beforeEnter(el: Element) {
    if (!(el instanceof HTMLElement)) return
    initialHeight = el.style.height
    initialOverflowY = el.style.overflowY
    el.style.height = '0'
}
function enter(el: Element) {
    if (!(el instanceof HTMLElement)) return
    el.style.overflowY = 'hidden'
    el.style.height = `${el.scrollHeight}px`
}
function afterEnter(el: Element) {
    if (!(el instanceof HTMLElement)) return
    el.style.height = initialHeight
    el.style.overflowY = initialOverflowY
}
function beforeLeave(el: Element) {
    if (!(el instanceof HTMLElement)) return
    el.style.height = `${el.scrollHeight}px`
}
function leave(el: Element) {
    if (!(el instanceof HTMLElement)) return
    if (el.scrollHeight !== 0) {
        el.style.overflowY = 'hidden'
        el.style.height = '0'
    }
}
function afterLeave(el: Element) {
    if (!(el instanceof HTMLElement)) return
    el.style.height = initialHeight
    el.style.overflowY = initialOverflowY
}
</script>
