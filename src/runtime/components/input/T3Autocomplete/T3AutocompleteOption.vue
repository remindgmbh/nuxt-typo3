<template>
    <NuxtLink
        v-if="option.link"
        class="t3-autocomplete-option"
        :class="{
            't3-autocomplete-option--hover': hovered,
        }"
        tabindex="-1"
        :to="option.link"
        @mouseleave="onMouseleave"
        @mouseover="onMouseover"
        >{{ option.label }}</NuxtLink
    >
    <div
        v-else
        class="t3-autocomplete-option"
        :class="{
            't3-autocomplete-option--selected': selected,
            't3-autocomplete-option--hover': hovered,
        }"
        @click="onClick"
        @mouseleave="onMouseleave"
        @mouseover="onMouseover"
    >
        {{ option.label }}
    </div>
</template>

<script setup lang="ts">
import type { T3Model } from '#imports'

defineProps<{
    option: T3Model.Input.Autocomplete.Option
    selected: boolean
    hovered: boolean
}>()

const emit = defineEmits<{
    click: [ev: Event]
    mouseover: [ev: Event]
    mouseleave: [ev: Event]
}>()

function onClick(ev: Event) {
    emit('click', ev)
}

function onMouseover(ev: Event) {
    emit('mouseover', ev)
}

function onMouseleave(ev: Event) {
    emit('mouseleave', ev)
}
</script>

<style lang="scss">
.t3-autocomplete-option {
    cursor: pointer;
}
</style>
