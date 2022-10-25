<template>
    <form class="t3-form" @submit="submit">
        <template
            v-for="formElement in formElements"
            :key="formElement.identifier"
        >
            <T3FormGroup
                v-if="formElement.isRow()"
                :form-elements="formElement.formElements"
                :loading="loading"
            />
            <T3FormElement
                v-else
                :form-element="formElement"
                :loading="loading"
            />
        </template>
        <button
            class="t3-form__submit"
            :class="{ 't3-form__submit--loading': loading }"
            type="submit"
            :disabled="loading"
        >
            <span class="t3-form__submit-label">{{
                loading && loadingLabel ? loadingLabel : submitLabel
            }}</span>
        </button>
    </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { T3Model } from '#nuxt-typo3'

const { handleSubmit } = useForm()

defineProps<{
    formElements: T3Model.FormElement[]
    loading?: boolean
    loadingLabel?: string
    submitLabel: string
}>()

const emit = defineEmits<{
    (e: 'submit', data: { [key: string]: string }): void
}>()

const submit = handleSubmit((values) => emit('submit', values))
</script>
