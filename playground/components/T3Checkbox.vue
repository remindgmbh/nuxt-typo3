<template>
    <BaseT3Checkbox v-bind="attrs">
        <template #error="{ errorMessage }">
            <slot name="error" :error-message="errorMessage"></slot>
        </template>
    </BaseT3Checkbox>
</template>

<script setup lang="ts">
import BaseT3Checkbox from '#nuxt-typo3/components/input/T3Checkbox.vue'
import { computed, useAttrs, useT3Theme } from '#imports'

const attrs: any = useAttrs()

const { themeOptions } = useT3Theme()

const colors = computed(() => themeOptions.value?.additionalData)
</script>

<style lang="scss">
.t3-checkbox {
    &__input {
        appearance: none;
        width: 1rem;
        height: 1rem;
        margin: 0;
        position: relative;

        &::before {
            width: 100%;
            height: 100%;
            border: solid 1px v-bind('colors.accent');
            content: '';
            position: absolute;
            box-sizing: border-box;
        }

        &:checked {
            &::before {
                background-color: v-bind('colors.primary');
            }
        }
    }
}
</style>
