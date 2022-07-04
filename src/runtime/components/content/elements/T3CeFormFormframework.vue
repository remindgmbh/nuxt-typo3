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
import { useRouter } from '#app'
import { Api, useApi, useCeFormFormframework } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: Api.ContentElement<Api.Content.Formframework>
}>()

const api = useApi()
const router = useRouter()
const { formElements } = useCeFormFormframework(props.contentElement.content)

async function submit(data: Record<string, any>) {
    const body = new FormData()
    body.set('responseElementId', props.contentElement.id.toString())

    Object.keys(data).forEach((key) => {
        body.set(key, data[key] ?? '')
    })

    const result = await api.post<
        Api.ContentElement<Api.Content.Formframework>
    >(props.contentElement.content.link.href, { body })

    if (typeof result.content.form === 'string') {
        console.error(result.content.form)
    } else if (
        result.content.form.api.status === 'success' &&
        result.content.form.api.actionAfterSuccess
    ) {
        router.push({
            path: result.content.form.api.actionAfterSuccess.redirectUrl,
        })
    }
}
</script>
