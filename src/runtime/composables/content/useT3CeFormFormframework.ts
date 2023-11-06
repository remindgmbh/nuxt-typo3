import { useI18n } from 'vue-i18n'
import { computed, ref, Ref } from 'vue'
import { useLogger } from '#nuxt-logger'
import * as T3Model from '../../models'
import { navigateTo, useT3Api } from '#imports'

export function useT3CeFormFormframework(
    contentElement: Ref<
        T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Formframework>
    >
) {
    const logger = useLogger()
    const api = useT3Api()
    const { t } = useI18n()

    const i18n = computed(() => contentElement.value.content.form.i18n)

    const submitLabel = computed<string>(
        () => i18n.value.submit || t('form.submit')
    )

    const loadingLabel = computed<string>(
        () => i18n.value.loading || t('form.loading')
    )

    const successLabel = computed<string>(
        () => i18n.value.success || t('form.success')
    )

    const requiredHint = computed<string>(
        () => i18n.value.required || t('form.required')
    )

    const loading = ref<boolean>(false)

    async function submit(data: Record<string, any>): Promise<void> {
        loading.value = true
        const body = new FormData()
        body.set('responseElementId', contentElement.value.id.toString())

        Object.keys(data).forEach((key) => {
            body.set(key, data[key] ?? '')
        })

        try {
            const result = await api.post<
                T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Formframework>
            >(contentElement.value.content.link, { body })

            if (typeof result.content.form === 'string') {
                logger.error('TYPO3 Error:', result.content.form)
            } else if (
                result.content.form.api.status === 'success' &&
                result.content.form.api.actionAfterSuccess
            ) {
                await navigateTo({
                    path: result.content.form.api.actionAfterSuccess
                        .redirectUrl,
                })
            }
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        loadingLabel,
        requiredHint,
        submitLabel,
        successLabel,
        submit,
    }
}
