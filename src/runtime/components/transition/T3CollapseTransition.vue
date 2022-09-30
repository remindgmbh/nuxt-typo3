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

function beforeEnter(el: HTMLElement) {
    initialHeight = el.style.height
    initialOverflowY = el.style.overflowY
    el.style.height = '0'
}
function enter(el: HTMLElement) {
    el.style.overflowY = 'hidden'
    el.style.height = `${el.scrollHeight}px`
}
function afterEnter(el: HTMLElement) {
    el.style.height = initialHeight
    el.style.overflowY = initialOverflowY
}
function beforeLeave(el: HTMLElement) {
    el.style.height = `${el.scrollHeight}px`
}
function leave(el: HTMLElement) {
    if (el.scrollHeight !== 0) {
        el.style.overflowY = 'hidden'
        el.style.height = '0'
    }
}
function afterLeave(el: HTMLElement) {
    el.style.height = initialHeight
    el.style.overflowY = initialOverflowY
}
</script>
