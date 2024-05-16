<template>
    <div
        class="t3-form-element"
        :class="[
            `t3-form-element--${formElement.type}`,
            {
                [`t3-form-element--size-${size}`]: size,
            },
        ]"
    >
        <component
            :is="FormElement"
            :form-element="formElement"
            :loading="loading"
        >
            <template #error="{ errorMessage }">
                <slot :error-message="errorMessage" name="error"></slot>
            </template>
        </component>
    </div>
</template>

<script setup lang="ts">
import { type T3Model, useT3DynamicComponent } from '#imports'
import { T3FormElementDefault } from '#components'
import { computed } from 'vue'

const props = defineProps<{
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
    loading?: boolean
}>()

const size = computed(() => props.formElement.properties?.size)

const FormElement = useT3DynamicComponent(
    props.formElement.type,
    'FormElement',
    T3FormElementDefault,
)
</script>

<style lang="scss">
.t3-form-element {
    &--Honeypot,
    &--Hidden {
        display: none;
    }

    &--size-25 {
        width: 25%;
    }

    &--size-33 {
        width: calc(100% / 3);
    }

    &--size-50 {
        width: 50%;
    }

    &--size-66 {
        width: calc(100% / 3 * 2);
    }

    &--size-75 {
        width: 75%;
    }
}
</style>
