<template>
    <transition
        name="collapse"
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
function beforeEnter(el: HTMLElement) {
    el.style.height = '0'
}
function enter(el: HTMLElement) {
    el.style.overflowY = 'hidden'
    el.style.height = `${el.scrollHeight}px`
}
function afterEnter(el: HTMLElement) {
    el.style.height = ''
    el.style.overflowY = ''
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
    el.style.height = ''
    el.style.overflowY = ''
}
</script>
