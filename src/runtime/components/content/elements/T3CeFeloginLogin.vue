<template>
    <div class="t3-ce-login">
        <T3CeHeader :id="id" :content="content" />
        <div v-if="showMessage" class="t3-ce-login__message">
            <div class="t3-ce-login__message-header">
                {{ content.data.message.header }}
            </div>
            <div class="t3-ce-login__message-body">
                {{ content.data.message.message }}
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
import { Api, Model, useApi, useApiData } from '#nuxt-typo3'

const props = defineProps<{
    id: number
    content: Api.ContentLogin
}>()

const api = useApi()
const apiData = useApiData()

const loading = ref(false)

const showMessage = computed(
    () =>
        props.content.data.message.header || props.content.data.message.message
)

const formElements = computed(() =>
    props.content.data.form.fields.pages
        .filter((field) => field.name !== 'submit')
        .map(Model.FormElement.createFromApiLoginElement)
)

const submitLabel = computed(
    () =>
        props.content.data.form.fields.pages.find(
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
        props.content.data.form.action,
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
