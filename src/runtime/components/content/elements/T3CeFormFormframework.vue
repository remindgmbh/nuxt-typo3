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
                :submit-label="contentElement.content.form.i18n.submit"
                @submit="submit"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Api, useCeFormFormframework } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: Api.ContentElement<Api.Content.Formframework>
}>()

const { formElements, loading, submit } = useCeFormFormframework(
    props.contentElement
)
</script>
