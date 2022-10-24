import { string, Schema } from 'yup'
import { GenericValidateFunction } from 'vee-validate'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { T3Api, T3Model, useT3UserState, useT3YupUtil } from '#nuxt-typo3'

type FormElementTypeMapping = {
    [Property in T3Api.Content.Login.FormElementType]: T3Model.FormElementType
}

const formElementTypeMapping: FormElementTypeMapping = {
    text: 'text',
    password: 'password',
    submit: 'submit',
}

export function useT3CeFeloginLogin(
    contentElement: T3Api.ContentElement<T3Api.Content.Felogin>
) {
    const { t } = useI18n()
    const { login } = useT3UserState()
    const { schemaToValidateFunction } = useT3YupUtil()

    const loading = ref(false)

    const showMessage = computed(() =>
        typeof contentElement.content.data !== 'string'
            ? !!contentElement.content.data.message.header ||
              !!contentElement.content.data.message.message
            : !!loginMessage.value
    )

    const messageHeader = computed(() =>
        typeof contentElement.content.data !== 'string'
            ? contentElement.content.data.message.header
            : undefined
    )

    const messageBody = computed(() =>
        typeof contentElement.content.data !== 'string'
            ? contentElement.content.data.message.message
            : undefined
    )

    const loginMessage = computed(() =>
        typeof contentElement.content.data === 'string'
            ? contentElement.content.data
            : undefined
    )

    const submitLabel = computed(() =>
        typeof contentElement.content.data !== 'string'
            ? contentElement.content.data.form.fields.pages.find(
                  (field) => field.name === 'submit'
              )?.value ?? ''
            : ''
    )

    const formElements = computed(() =>
        typeof contentElement.content.data !== 'string'
            ? contentElement.content.data.form.fields.pages
                  .filter((field) => field.name !== 'submit')
                  .map(convert)
            : []
    )

    function getValidation(formElement: T3Api.Content.Login.FormElement) {
        const result: GenericValidateFunction[] = []

        if (formElement.validate) {
            Object.keys(formElement.validate).forEach((identifier) => {
                let schema: Schema | undefined
                switch (identifier) {
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

    function convert(
        formElement: T3Api.Content.Login.FormElement
    ): T3Model.FormElement {
        return new T3Model.FormElement({
            type: formElementTypeMapping[formElement.type] ?? 'hidden',
            label: formElement.label,
            name: formElement.name,
            defaultValue: formElement.value,
            required: !!formElement.validate?.required,
            validation: getValidation(formElement),
        })
    }

    async function submit(data: Record<string, any>) {
        if (typeof contentElement.content.data === 'string') {
            return
        }

        loading.value = true

        try {
            await login(contentElement.content.data.form.action, data)
        } finally {
            loading.value = false
        }
    }

    return {
        formElements,
        loading,
        loginMessage,
        messageBody,
        messageHeader,
        showMessage,
        submitLabel,
        submit,
    }
}
