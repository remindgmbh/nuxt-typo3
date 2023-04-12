<template>
    <div
        class="t3-ce-login"
        :class="{
            [`t3-ce-login--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3Header :content-element="contentElement" />
        <div class="t3-ce-login__message">
            <div class="t3-ce-login__message-header">
                {{ message.header }}
            </div>
            <div class="t3-ce-login__message-body">
                {{ message.body }}
            </div>
        </div>
        <T3Form
            class="t3-ce-login__form"
            :form-elements="formElements"
            :loading="loading"
            :submit-label="submitLabel"
            @submit="submit"
        >
        </T3Form>
    </div>
</template>

<script setup lang="ts">
import { T3Model, useT3CeFeloginLogin } from '#imports'

const props = defineProps<{
    contentElement: T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Felogin>
}>()

const { formElements, loading, message, submitLabel, submit } =
    useT3CeFeloginLogin(props.contentElement)
</script>
