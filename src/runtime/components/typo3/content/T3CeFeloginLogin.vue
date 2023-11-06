<template>
    <div class="t3-ce-login">
        <T3Header
            class="t3-ce-login__header"
            :content="contentElement.content"
        />
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
import { T3Model, useT3CeFeloginLogin, useT3Content } from '#imports'

const { injectContentElement } = useT3Content()

const contentElement =
    injectContentElement<T3Model.Typo3.Content.Data.Felogin>()

const { formElements, loading, message, submitLabel, submit } =
    useT3CeFeloginLogin(contentElement)
</script>
