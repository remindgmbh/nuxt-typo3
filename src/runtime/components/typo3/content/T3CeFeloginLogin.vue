<template>
    <div class="ce-login">
        <component
            :is="Header"
            class="ce-login__header"
            :content="contentElement.content"
        />
        <div class="ce-login__message">
            <div class="ce-login__message-header">
                {{ message.header }}
            </div>
            <div class="ce-login__message-body">
                {{ message.body }}
            </div>
        </div>
        <component
            :is="Form"
            class="ce-login__form"
            :form-elements="formElements"
            :loading="loading"
            :submit-label="submitLabel"
            @submit="submit"
        />
    </div>
</template>

<script setup lang="ts">
import {
    T3Model,
    useT3CeFeloginLogin,
    useT3Content,
    useT3DynamicComponent,
} from '#imports'
import { T3Form, T3Header } from '#components'

const { injectContentElement } = useT3Content()

const contentElement =
    injectContentElement<T3Model.Typo3.Content.Data.Felogin>()

const Header = useT3DynamicComponent<typeof T3Header>('Header')
const Form = useT3DynamicComponent<typeof T3Form>('Form')

const { formElements, loading, message, submitLabel, submit } =
    useT3CeFeloginLogin(contentElement)
</script>
