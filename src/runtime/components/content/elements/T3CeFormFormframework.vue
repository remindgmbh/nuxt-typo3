<template>
    <div
        class="t3-ce-form"
        :class="{
            [`t3-ce-form--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3Text class="t3-ce-form__text" :content-element="contentElement" />
        <div :class="`t3-ce-form__form`">
            <T3Form
                :form-elements="formElements"
                :loading="loading"
                :loading-label="loadingLabel"
                :required-hint="requiredHint"
                :submit-label="submitLabel"
                @submit="submit"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { T3Api, useT3CeFormFormframework } from '#imports'

const props = defineProps<{
    contentElement: T3Api.ContentElement<T3Api.Content.Formframework>
}>()

const {
    formElements,
    loading,
    loadingLabel,
    requiredHint,
    submitLabel,
    submit,
} = useT3CeFormFormframework(props.contentElement)
</script>
