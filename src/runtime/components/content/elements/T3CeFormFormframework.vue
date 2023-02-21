<template>
    <div
        class="t3-ce-form"
        :class="{
            [`t3-ce-form--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3Header :content-element="contentElement" />
        <div :class="`t3-ce-form__form`">
            <T3Form
                :form-elements="formElements"
                :loading="loading"
                :loading-label="loadingLabel"
                :submit-label="submitLabel"
                @submit="submit"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { T3Api } from '#nuxt-typo3'
import { useT3CeFormFormframework } from '#nuxt-typo3/composables/content/useT3CeFormFormframework'

const props = defineProps<{
    contentElement: T3Api.ContentElement<T3Api.Content.Formframework>
}>()

const { formElements, loading, loadingLabel, submitLabel, submit } =
    useT3CeFormFormframework(props.contentElement)
</script>
