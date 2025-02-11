<template>
    <div
        class="t3-form-framework-element"
        :class="[
            `t3-form-framework-element--${type}`,
            { [`t3-form-framework-element--${size}`]: size },
        ]"
    >
        <component :is="FormElement" v-bind="$props" />
    </div>
</template>

<script setup lang="ts">
import { type T3Model, useT3DynamicComponent } from '#imports'
import { T3FormFrameworkElementDefault } from '#components'
import { computed } from 'vue'
import { kebabCase } from 'scule'

export interface Props {
    apiError?: string
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
    loading?: boolean
}

const props = defineProps<Props>()

const size = computed(() => props.formElement.properties?.size)
const type = computed(() => kebabCase(props.formElement.type))

const FormElement = useT3DynamicComponent(
    props.formElement.type,
    'FormFrameworkElement',
    T3FormFrameworkElementDefault,
)
</script>

<style lang="scss">
.t3-form-framework-element {
    &--honeypot,
    &--hidden {
        display: none !important;
    }
}
</style>
