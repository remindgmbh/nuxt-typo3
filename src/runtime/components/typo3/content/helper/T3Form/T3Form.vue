<template>
    <form class="t3-form" @submit="submit">
        <div class="t3-form__elements">
            <T3FormElements
                :api-errors="apiErrors"
                :form-elements="formElements"
                :loading="loading"
            >
                <template #error="{ errorMessage }">
                    <slot :error-message="errorMessage" name="error"></slot>
                </template>
            </T3FormElements>
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

export interface Props {
    apiErrors?: T3Model.Typo3.Content.Data.Form.Form['api']['errors']
    formElements: T3Model.Typo3.Content.Data.Form.FormElement[]
    loading?: boolean
    loadingLabel?: string
    submitLabel: string
}

defineProps<Props>()

const emit = defineEmits<{
    submit: [data: { [key: string]: string }]
}>()

const { handleSubmit } = useForm()

const submit = handleSubmit((values) => emit('submit', values))
</script>
