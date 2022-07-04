<template>
    <form class="t3-form" @submit="submit">
        <template
            v-for="formElement in formElements"
            :key="formElement.identifier"
        >
            <T3FormGroup
                v-if="formElement.isRow()"
                :form-elements="formElement.formElements"
            />
            <T3FormElement v-else :form-element="formElement" />
        </template>
        <button
            class="t3-form__submit"
            :class="{ 't3-form__submit--loading': loading }"
            type="submit"
        >
            <span class="t3-form__submit-label">{{ submitLabel }}</span>
        </button>
    </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { Model } from '#nuxt-typo3'

const { handleSubmit } = useForm()

defineProps<{
    formElements: Model.FormElement[]
    loading?: boolean
    submitLabel: string
}>()

const emit = defineEmits<{
    (e: 'submit', data: { [key: string]: string }): void
}>()

const submit = handleSubmit((values) => emit('submit', values))
</script>
