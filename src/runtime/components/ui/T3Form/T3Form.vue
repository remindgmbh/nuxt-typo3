<template>
    <form class="t3-form" @submit="submit">
        <div class="t3-form__elements">
            <template
                v-for="formElement in formElements"
                :key="formElement.identifier"
            >
                <T3FormGroup
                    v-if="formElement.isRow()"
                    :form-elements="formElement.formElements"
                    :loading="loading"
                >
                    <template #error="{ errorMessage }">
                        <slot name="error" :error-message="errorMessage"></slot>
                    </template>
                </T3FormGroup>
                <T3FormElement
                    v-else
                    :form-element="formElement"
                    :loading="loading"
                >
                    <template #error="{ errorMessage }">
                        <slot name="error" :error-message="errorMessage"></slot>
                    </template>
                </T3FormElement>
            </template>
        </div>
        <div v-if="showRequiredHint" class="t3-form__required-hint">
            {{ requiredHint }}
        </div>
        <div class="t3-form__submit-wrapper">
            <button
                class="t3-form__submit"
                :class="{ 't3-form__submit--loading': loading }"
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
import { computed } from 'vue'
import { T3Model } from '#imports'

const { handleSubmit } = useForm()

const props = defineProps<{
    formElements: T3Model.FormElement.Base[]
    loading?: boolean
    loadingLabel?: string
    submitLabel: string
    requiredHint?: string
}>()

const showRequiredHint = computed(() =>
    props.formElements.some((element) => element.required)
)

const emit = defineEmits<{
    (e: 'submit', data: { [key: string]: string }): void
}>()

const submit = handleSubmit((values) => emit('submit', values))
</script>
