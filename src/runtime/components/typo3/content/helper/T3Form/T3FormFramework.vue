<template>
    <form class="t3-form-framework" @submit="submit">
        <div class="t3-form-framework__elements">
            <T3FormFrameworkElements
                :api-errors="apiErrors"
                :form-elements="formElements"
                :loading="loading"
            />
        </div>
        <slot name="beforeSubmit"></slot>
        <div class="t3-form-framework__submit-wrapper">
            <button
                class="t3-form-framework__submit"
                :class="{ 't3-form-framework__submit--loading': loading }"
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
import type { T3Model } from '#imports'
import { useForm } from 'vee-validate'

export interface Props {
    apiErrors?: T3Model.Typo3.Content.Data.Form.Form['api']['errors']
    formElements: T3Model.Typo3.Content.Data.Form.FormElement[]
    loading?: boolean
    loadingLabel?: string
    submitLabel: string
}
export interface Emits {
    submit: [data: { [key: string]: string }]
}

export interface Slots {
    beforeSubmit(): any
    submit(): any
}

defineProps<Props>()
const emit = defineEmits<Emits>()
defineSlots<Slots>()

const { handleSubmit } = useForm()

const submit = handleSubmit((values) => emit('submit', values))
</script>
