<template>
    <div class="form-group">
        <component
            :is="FormElement"
            v-for="formElement in formElements"
            :key="formElement.name"
            :form-element="formElement"
            :loading="loading"
        >
            <template #error="{ errorMessage }">
                <slot name="error" :error-message="errorMessage"></slot>
            </template>
        </component>
    </div>
</template>

<script setup lang="ts">
import { T3Model, useT3DynamicComponent } from '#imports'
import { T3FormElement } from '#components'

defineProps<{
    formElements: T3Model.Typo3.Content.Data.Form.FormElement[]
    loading?: boolean
}>()

const FormElement = useT3DynamicComponent<typeof T3FormElement>('FormElement')
</script>

<style lang="scss">
.form-group {
    display: flex;
    flex-wrap: wrap;
}
</style>
