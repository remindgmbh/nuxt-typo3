<template>
    <form class="form" @submit="submit">
        <div class="form__elements">
            <template
                v-for="formElement in formElements"
                :key="formElement.identifier"
            >
                <component
                    :is="FormGroup"
                    v-if="formElement.type === 'GridRow'"
                    :form-elements="formElement.elements ?? []"
                    :loading="loading"
                >
                    <template #error="{ errorMessage }">
                        <slot name="error" :error-message="errorMessage"></slot>
                    </template>
                </component>
                <component
                    :is="FormElement"
                    v-else
                    :form-element="formElement"
                    :loading="loading"
                >
                    <template #error="{ errorMessage }">
                        <slot name="error" :error-message="errorMessage"></slot>
                    </template>
                </component>
            </template>
        </div>
        <slot name="before-submit"></slot>
        <div class="form__submit-wrapper">
            <button
                class="form__submit"
                :class="{ 'form__submit--loading': loading }"
                type="submit"
                :disabled="loading"
            >
                <slot name="submit">
                    {{ loading && loadingLabel ? loadingLabel : submitLabel }}
                </slot>
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { T3Model, useT3DynamicComponent } from '#imports'
import { T3FormElement, T3FormGroup } from '#components'

const { handleSubmit } = useForm()

defineProps<{
    formElements: T3Model.Typo3.Content.Data.Form.FormElement[]
    loading?: boolean
    loadingLabel?: string
    submitLabel: string
}>()

const FormElement = useT3DynamicComponent<typeof T3FormElement>('FormElement')
const FormGroup = useT3DynamicComponent<typeof T3FormGroup>('FormGroup')

const emit = defineEmits<{
    (e: 'submit', data: { [key: string]: string }): void
}>()

const submit = handleSubmit((values) => emit('submit', values))
</script>
