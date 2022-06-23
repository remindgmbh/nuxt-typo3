<template>
    <div
        class="t3-ce-form"
        :class="{
            [`t3-ce-form--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3CeHeader :content-element="contentElement" />
        <div :class="`t3-ce-form__form`">
            <T3Form
                :form-elements="formElements"
                :submit-label="contentElement.content.form.i18n.submit"
                @submit="submit"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from '#app'
import { Api, Model, useApi } from '#nuxt-typo3'

const api = useApi()
const router = useRouter()

const props = defineProps<{
    contentElement: Api.ContentElement<Api.ContentForm>
}>()

const formElements = computed(() =>
    props.contentElement.content.form.elements.map(
        Model.FormElement.createFromApiFormElement
    )
)

async function submit(data: Record<string, any>) {
    const body = new FormData()
    body.set('responseElementId', props.contentElement.id.toString())

    Object.keys(data).forEach((key) => {
        body.set(key, data[key] ?? '')
    })

    const result = await api.post<Api.ContentElement<Api.ContentForm>>(
        props.contentElement.content.link.href,
        { body }
    )
    if (
        result.content.form.api.status === 'success' &&
        result.content.form.api.actionAfterSuccess
    ) {
        router.push({
            path: result.content.form.api.actionAfterSuccess.redirectUrl,
        })
    }
}
</script>
