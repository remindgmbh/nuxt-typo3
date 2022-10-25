<template>
    <div
        class="t3-ce-login"
        :class="{
            [`t3-ce-login--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3Header :content-element="contentElement" />
        <div v-if="showMessage" class="t3-ce-login__message">
            <div v-if="messageHeader" class="t3-ce-login__message-header">
                {{ messageHeader }}
            </div>
            <div v-if="messageBody" class="t3-ce-login__message-body">
                {{ messageBody }}
            </div>
            <T3HtmlParser v-if="loginMessage" :content="loginMessage" />
        </div>
        <T3Form
            v-if="!loginMessage"
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
import { T3Api, useT3CeFeloginLogin } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: T3Api.ContentElement<T3Api.Content.Felogin>
}>()

const {
    formElements,
    loading,
    loginMessage,
    messageBody,
    messageHeader,
    submitLabel,
    showMessage,
    submit,
} = useT3CeFeloginLogin(props.contentElement)
</script>
