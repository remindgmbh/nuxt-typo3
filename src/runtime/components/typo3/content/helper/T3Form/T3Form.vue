<template>
    <form class="t3-form" @submit="submit">
        <div class="t3-form__elements">
            <template
                v-for="formElement in formElements"
                :key="formElement.name"
            >
                <T3FormGroup
                    v-if="formElement.type === 'GridRow'"
                    :form-elements="formElement.elements ?? []"
                    :loading="loading"
                >
                    <template #error="{ errorMessage }">
                        <slot :error-message="errorMessage" name="error"></slot>
                    </template>
                </T3FormGroup>
                <T3FormElement
                    v-else
                    :form-element="formElement"
                    :loading="loading"
                >
                    <template #error="{ errorMessage }">
                        <slot :error-message="errorMessage" name="error"></slot>
                    </template>
                </T3FormElement>
            </template>
        </div>
        <slot name="before-submit"></slot>
        <div class="t3-form__submit-wrapper">
            <button
                class="t3-form__submit"
                :class="{ 't3-form__submit--loading': loading }"
                :disabled="loading"
                type="submit"
            >
                <slot name="submit">
                    {{ loading && loadingLabel ? loadingLabel : submitLabel }}
                </slot>
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { type T3Model } from '#imports'
import { useForm } from 'vee-validate'

defineProps<{
    formElements: T3Model.Typo3.Content.Data.Form.FormElement[]
    loading?: boolean
    loadingLabel?: string
    submitLabel: string
}>()

const emit = defineEmits<{
    (e: 'submit', data: { [key: string]: string }): void
}>()

const { handleSubmit } = useForm()

const submit = handleSubmit((values) => emit('submit', values))
</script>
