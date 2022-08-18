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
import { computed, ref } from 'vue'
import { Api, useCeFeloginLogin, useUserState } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: Api.ContentElement<Api.Content.Felogin>
}>()

const content = computed(() => props.contentElement.content)

const { formElements } = useCeFeloginLogin(content)
const { login } = useUserState()

const loading = ref(false)

const showMessage = computed(() =>
    typeof props.contentElement.content.data !== 'string'
        ? !!props.contentElement.content.data.message.header ||
          !!props.contentElement.content.data.message.message
        : !!loginMessage.value
)

const messageHeader = computed(() =>
    typeof props.contentElement.content.data !== 'string'
        ? props.contentElement.content.data.message.header
        : undefined
)

const messageBody = computed(() =>
    typeof props.contentElement.content.data !== 'string'
        ? props.contentElement.content.data.message.message
        : undefined
)

const loginMessage = computed(() =>
    typeof props.contentElement.content.data === 'string'
        ? props.contentElement.content.data
        : undefined
)

const submitLabel = computed(() =>
    typeof props.contentElement.content.data !== 'string'
        ? props.contentElement.content.data.form.fields.pages.find(
              (field) => field.name === 'submit'
          )?.value ?? ''
        : ''
)

async function submit(data: Record<string, any>) {
    if (typeof props.contentElement.content.data === 'string') {
        return
    }

    loading.value = true

    try {
        await login(props.contentElement.content.data.form.action, data)
    } finally {
        loading.value = false
    }
}
</script>
