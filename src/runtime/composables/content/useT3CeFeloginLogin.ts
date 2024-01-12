import * as T3Model from '../../models'
import { type Ref, computed, ref } from 'vue'
import { Schema, string } from 'yup'
import {
    navigateTo,
    useRoute,
    useT3Api,
    useT3Data,
    useT3YupUtil,
} from '#imports'
import { type GenericValidateFunction } from 'vee-validate'
import { useI18n } from 'vue-i18n'

export function useT3CeFeloginLogin(
    contentElement: Ref<
        T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Felogin>
    >,
) {
    const { t } = useI18n()
    const { schemaToValidateFunction } = useT3YupUtil()
    const api = useT3Api()
    const { clearData, currentInitialData, currentPageData } = useT3Data()

    const message = ref<{
        body: string
        header: string
    }>({
        body: contentElement.value.content.data.message.message,
        header: contentElement.value.content.data.message.header,
    })

    const loading = ref<boolean>(false)

    // TODO: default value
    const submitLabel = computed<string>(
        () =>
            contentElement.value.content.data.form.elements.find(
                (element) => element.name === 'submit',
            )?.value ?? '',
    )

    const formElements = computed<
        T3Model.Typo3.Content.Data.Form.FormElement[]
    >(
        () => [],
        // contentElement.value.content.data.form.elements
        //     .filter((element) => element.name !== 'submit')
        //     .map(convert)
    )

    // function convert(
    //     formElement: T3Model.Typo3.Content.Data.Login.FormElement
    // ): T3Model.FormElement.Base {
    //     return new T3Model.FormElement.Base({
    //         type: formElementTypeMapping[formElement.type] ?? 'hidden',
    //         label: formElement.label,
    //         name: formElement.name,
    //         defaultValue: formElement.value,
    //         required: formElement.validators?.some(
    //             (validator) => validator.identifier === 'required'
    //         ),
    //         validation: getValidation(formElement),
    //     })
    // }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function getValidation(
        formElement: T3Model.Typo3.Content.Data.Login.FormElement,
    ): GenericValidateFunction[] {
        const result: GenericValidateFunction[] = []

        if (formElement.validators) {
            formElement.validators.forEach((validator) => {
                let schema: Schema | undefined
                switch (validator.identifier) {
                    case 'email':
                        schema = string()
                        break
                    case 'required':
                        schema = string().required(
                            t('validation.required', {
                                label: formElement.label,
                            }),
                        )
                        break
                    case 'password':
                        schema = string()
                        break
                }
                if (schema) {
                    result.push(schemaToValidateFunction(schema))
                }
            })
        }

        return result
    }

    async function submit(data: Record<string, any>): Promise<void> {
        loading.value = true

        const loginType = contentElement.value.content.data.form.elements.find(
            (element) => element.name === 'logintype',
        )?.value as 'login' | 'logout' | undefined

        try {
            const body = new FormData()
            body.set('responseElementId', contentElement.value.id.toString())

            Object.keys(data).forEach((key) => {
                body.set(key, data[key])
            })

            const result = await api.post<
                T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.FeloginActionResponse>
            >(contentElement.value.content.data.form.action, {
                body,
            })

            let { redirectUrl } = result.content.data

            if (
                loginType === 'logout' ||
                result.content.data.status === 'success'
            ) {
                // Login Status changed => clearData in case logged in user has extended permissions
                const initialData = await api.getInitialData(
                    useRoute().fullPath,
                    { cache: 'no-cache' },
                )
                const currentPath = currentPageData.value?.slug
                clearData()
                currentInitialData.value = initialData

                // If no redirect is set up use current path so page reloads and fetches API data
                if (!redirectUrl) {
                    redirectUrl = currentPath
                }
            } else if (result.content.data.message) {
                // Login was unsuccessful and no redirect is set up => error message is shown
                message.value.header = result.content.data.message.header
                message.value.body = result.content.data.message.message
            }

            if (redirectUrl) {
                await navigateTo({
                    force: true,
                    path: redirectUrl,
                    replace: true,
                })
            }
        } finally {
            loading.value = false
        }
    }

    return {
        formElements,
        loading,
        message,
        submitLabel,

        submit,
    }
}
