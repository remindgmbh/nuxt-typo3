import {
    type T3Model,
    navigateTo,
    useLogger,
    useT3Api,
    useT3ContentInjection,
} from '#imports'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export function useT3CeFormFormframework() {
    const logger = useLogger()
    const api = useT3Api()
    const { t } = useI18n()
    const { injectContentElement } = useT3ContentInjection()

    const injectedContentElement =
        injectContentElement<T3Model.Typo3.Content.Data.Formframework>()

    const responseContentElement =
        ref<
            T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Formframework>
        >()

    const contentElement = computed(
        () => responseContentElement.value ?? injectedContentElement.value,
    )

    const formElements = computed(
        () => contentElement.value.content.form.elements,
    )

    const apiErrors = computed(
        () => contentElement.value.content.form.api.errors,
    )

    const i18n = computed(() => contentElement.value.content.form.i18n)

    const submitLabel = computed<string>(
        () => i18n.value.submit || t('form.submit'),
    )

    const loadingLabel = computed<string>(
        () => i18n.value.loading || t('form.loading'),
    )

    const successLabel = computed<string>(
        () => i18n.value.success || t('form.success'),
    )

    const requiredHint = computed<string>(
        () => i18n.value.required || t('form.required'),
    )

    const loading = ref<boolean>(false)

    async function submit(data: Record<string, any>): Promise<void> {
        loading.value = true
        const body = new FormData()
        body.set(
            'responseElementId',
            injectedContentElement.value.id.toString(),
        )

        Object.keys(data).forEach((key) => {
            // necessary for multiple files
            if (Array.isArray(data[key])) {
                data[key].forEach((value, index) => {
                    body.append(`${key}[${index}]`, value)
                })
            } else {
                body.set(key, data[key] ?? '')
            }
        })

        try {
            const result = await api.post<
                T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Formframework>
            >(injectedContentElement.value.content.link, { body })

            if (typeof result.content.form === 'string') {
                logger.error('TYPO3 Error:', result.content.form)
            } else {
                responseContentElement.value = result

                if (
                    result.content.form.api.status === 'success' &&
                    result.content.form.api.actionAfterSuccess
                ) {
                    await navigateTo({
                        path: result.content.form.api.actionAfterSuccess
                            .redirectUrl,
                    })
                }
            }
        } finally {
            loading.value = false
        }
    }

    return {
        apiErrors,
        contentElement,
        formElements,
        loading,
        loadingLabel,
        requiredHint,
        submitLabel,
        successLabel,

        submit,
    }
}
