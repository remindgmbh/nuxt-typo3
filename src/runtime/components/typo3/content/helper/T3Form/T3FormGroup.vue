<template>
    <div class="t3-form-group">
        <T3FormElement
            v-for="formElement in formElements"
            :key="formElement.name"
            :form-element="formElement"
            :loading="loading"
        >
            <template #error="{ errorMessage }">
                <slot :error-message="errorMessage" name="error"></slot>
            </template>
        </T3FormElement>
    </div>
</template>

<script setup lang="ts">
import { type T3Model } from '#imports'

defineProps<{
    formElements: T3Model.Typo3.Content.Data.Form.FormElement[]
    loading?: boolean
}>()
</script>

<style lang="scss">
.t3-form-group {
    display: flex;
    flex-wrap: wrap;
}
</style>
