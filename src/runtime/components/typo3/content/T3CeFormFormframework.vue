<template>
    <div class="t3-ce-form">
        <T3Text class="t3-ce-form__text" :content="contentElement.content" />
        <div :class="`t3-ce-form__form`">
            <T3Form
                :form-elements="contentElement.content.form.elements"
                :loading="loading"
                :loading-label="loadingLabel"
                :submit-label="submitLabel"
                @submit="submit"
            >
                <template #error="{ errorMessage }">
                    <T3InputError :error-message="errorMessage" />
                </template>
            </T3Form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { T3Model, useT3CeFormFormframework } from '#imports'

const props = defineProps<{
    contentElement: T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Formframework>
}>()

const { loading, loadingLabel, submitLabel, submit } = useT3CeFormFormframework(
    props.contentElement
)
</script>
