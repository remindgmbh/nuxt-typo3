<template>
    <NuxtLink
        v-if="option.link"
        :to="option.link"
        class="autocomplete-option"
        :class="{
            'autocomplete-option--hover': hovered,
        }"
        @mouseover="onMouseover"
        @mouseleave="onMouseleave"
        >{{ option.label }}</NuxtLink
    >
    <div
        v-else
        class="autocomplete-option"
        :class="{
            'autocomplete-option--selected': selected,
            'autocomplete-option--hover': hovered,
        }"
        @click="onClick"
        @mouseover="onMouseover"
        @mouseleave="onMouseleave"
    >
        {{ option.label }}
    </div>
</template>

<script setup lang="ts">
import { T3Model } from '#imports'

defineProps<{
    option: T3Model.Input.Autocomplete.Option
    selected: boolean
    hovered: boolean
}>()

const emit = defineEmits<{
    (e: 'click', ev: Event): void
    (e: 'mouseover', ev: Event): void
    (e: 'mouseleave', ev: Event): void
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
.autocomplete-option {
    cursor: pointer;
}
</style>
