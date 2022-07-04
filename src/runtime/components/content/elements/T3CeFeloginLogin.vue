<template>
    <div
        class="t3-ce-login"
        :class="{
            [`t3-ce-login--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3CeHeader :content-element="contentElement" />
        <div v-if="showMessage" class="t3-ce-login__message">
            <div class="t3-ce-login__message-header">
                {{ contentElement.content.data.message.header }}
            </div>
            <div class="t3-ce-login__message-body">
                {{ contentElement.content.data.message.message }}
            </div>
        </div>
        <T3Form
            class="t3-ce-login__form"
            :form-elements="formElements"
            :submit-label="submitLabel"
            @submit="submit"
        >
        </T3Form>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Api, useApi, useApiData, useCeFeloginLogin } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: Api.ContentElement<Api.Content.Felogin>
}>()

const api = useApi()
const apiData = useApiData()
const { formElements } = useCeFeloginLogin(props.contentElement.content)

const loading = ref(false)

const showMessage = computed(
    () =>
        props.contentElement.content.data.message.header ||
        props.contentElement.content.data.message.message
)

const submitLabel = computed(
    () =>
        props.contentElement.content.data.form.fields.pages.find(
            (field) => field.name === 'submit'
        )?.value ?? ''
)

async function submit(data: Record<string, any>) {
    loading.value = true
    const body = new FormData()

    Object.keys(data).forEach((key) => {
        body.set(key, data[key])
    })

    const result = await api.post<Api.PageData>(
        props.contentElement.content.data.form.action,
        {
            body,
        }
    )

    // Store current page languages because result from login contains query parameters
    result.i18n = apiData.pageData.value?.i18n ?? result.i18n

    // Clear cached data and get new initialData in case logged in user has extended access
    const initialData = await api.getInitialData()
    apiData.clearData()
    apiData.setCurrentPage(result)
    apiData.setCurrentInitialData(initialData)
    loading.value = false
}
</script>
