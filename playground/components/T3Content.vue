<template>
    <BaseT3Content class="pg-content" v-bind="props" />
</template>

<script setup lang="ts">
import { T3Api } from '#nuxt-typo3'
import BaseT3Content from '#nuxt-typo3/components/content/helper/T3Content.vue'

const props = defineProps<{
    contentElement: T3Api.ContentElement
}>()

const { spaceBefore, spaceAfter, spaceBeforeInside, spaceAfterInside } =
    useT3ContentUtil(props.contentElement)
</script>

<style lang="scss">
@use '@/assets/breakpoints.scss';

.pg-content.t3-content {
    @include breakpoints.up('md') {
        margin-top: calc(v-bind(spaceBefore) * 2);
        margin-bottom: calc(v-bind(spaceAfter) * 2);
        padding-top: calc(v-bind(spaceBeforeInside) * 2);
        padding-bottom: calc(v-bind(spaceAfterInside) * 2);
    }
}
</style>
