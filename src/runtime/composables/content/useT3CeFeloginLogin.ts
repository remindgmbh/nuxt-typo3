import { string, Schema } from 'yup'
import { GenericValidateFunction } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import * as T3Model from '../../models'
import { navigateTo, useT3Api, useT3ApiData, useT3YupUtil } from '#imports'

export function useT3CeFeloginLogin(
    contentElement: T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Felogin>
) {
    const { t } = useI18n()
    const { schemaToValidateFunction } = useT3YupUtil()
    const api = useT3Api()
    const { clearData, setCurrentInitialData, currentPageData } = useT3ApiData()

    const message = ref<{
        header: string
        body: string
    }>({
        header: contentElement.content.data.message.header,
        body: contentElement.content.data.message.message,
    })

    const loading = ref<boolean>(false)

    // TODO: default value
    const submitLabel = computed<string>(
        () =>
            contentElement.content.data.form.elements.find(
                (element) => element.name === 'submit'
            )?.value ?? ''
    )

    const formElements = computed<
        T3Model.Typo3.Content.Data.Form.FormElement[]
    >(
        () => []
        // contentElement.content.data.form.elements
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
        formElement: T3Model.Typo3.Content.Data.Login.FormElement
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
                            })
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

        const loginType = contentElement.content.data.form.elements.find(
            (element) => element.name === 'logintype'
        )?.value as 'login' | 'logout' | undefined

        try {
            const body = new FormData()
            body.set('responseElementId', contentElement.id.toString())

            Object.keys(data).forEach((key) => {
                body.set(key, data[key])
            })

            const result = await api.post<
                T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.FeloginActionResponse>
            >(contentElement.content.data.form.action, {
                body,
            })

            let redirectUrl = result.content.data.redirectUrl

            if (
                loginType === 'logout' ||
                result.content.data.status === 'success'
            ) {
                // Login Status changed => clearData in case logged in user has extended permissions
                const initialData = await api.getInitialData({
                    fetchOptions: { cache: 'no-cache' },
                })
                const currentPath = currentPageData.value?.slug
                clearData()
                setCurrentInitialData(initialData)

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
                    path: redirectUrl,
                    force: true,
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
