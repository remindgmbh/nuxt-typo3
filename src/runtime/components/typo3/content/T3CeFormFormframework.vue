<template>
    <div class="ce-form">
        <component
            :is="Text"
            class="ce-form__text"
            :content="contentElement.content"
        />
        <div :class="`ce-form__form`">
            <component
                :is="Form"
                :form-elements="contentElement.content.form.elements"
                :loading="loading"
                :loading-label="loadingLabel"
                :submit-label="submitLabel"
                @submit="submit"
            >
                <template #error="{ errorMessage }">
                    <component :is="InputError" :error-message="errorMessage" />
                </template>
            </component>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    T3Model,
    useT3CeFormFormframework,
    useT3Content,
    useT3DynamicComponent,
} from '#imports'
import { T3Form, T3Text, T3InputError } from '#components'

const { injectContentElement } = useT3Content()

const contentElement =
    injectContentElement<T3Model.Typo3.Content.Data.Formframework>()

const Text = useT3DynamicComponent<typeof T3Text>('Text')
const Form = useT3DynamicComponent<typeof T3Form>('Form')
const InputError = useT3DynamicComponent<typeof T3InputError>('InputError')

const { loading, loadingLabel, submitLabel, submit } =
    useT3CeFormFormframework(contentElement)
</script>
