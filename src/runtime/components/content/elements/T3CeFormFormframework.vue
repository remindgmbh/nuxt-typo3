<template>
    <div class="t3-ce-form">
        <T3Text class="t3-ce-form__text" :content="contentElement.content" />
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
import { T3Model, useT3CeFormFormframework } from '#imports'

const props = defineProps<{
    contentElement: T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Formframework>
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
