<template>
    <form @submit="submit">
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
        <button type="submit">{{ submitLabel }}</button>
    </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { Model } from '#nuxt-typo3'

const { handleSubmit } = useForm()

defineProps<{
    submitLabel: string
    formElements: Model.FormElement[]
}>()

const emit = defineEmits<{
    (e: 'submit', data: { [key: string]: string }): void
}>()

const submit = handleSubmit((values) => emit('submit', values))
</script>
