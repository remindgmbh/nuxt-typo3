import Joi from 'joi'
import { GenericValidateFunction } from 'vee-validate'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Api, Model, useUserState } from '#nuxt-typo3'

type FormElementTypeMapping = {
    [Property in Api.Content.Login.FormElementType]: Model.FormElementType
}

const formElementTypeMapping: FormElementTypeMapping = {
    text: 'text',
    password: 'password',
    submit: 'submit',
}

export function useCeFeloginLogin(
    contentElement: Api.ContentElement<Api.Content.Felogin>
) {
    const { t } = useI18n()
    const { login } = useUserState()

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

    function getValidation(formElement: Api.Content.Login.FormElement) {
        const result: GenericValidateFunction[] = []

        if (formElement.validate) {
            Object.keys(formElement.validate).forEach((identifier) => {
                let schema: Joi.Schema | undefined
                switch (identifier) {
                    case 'email':
                        schema = Joi.string()
                        break
                    case 'required':
                        schema = Joi.string()
                            .required()
                            .error(
                                new Error(
                                    t('validation.required', {
                                        label: formElement.label,
                                    })
                                )
                            )
                        break
                    case 'password':
                        schema = Joi.string()
                        break
                }
                if (schema) {
                    const validateFunction = (value: any) => {
                        const validateResult = schema?.validate(value)
                        return validateResult?.error?.message ?? true
                    }
                    result.push(validateFunction)
                }
            })
        }

        return result
    }

    function convert(
        formElement: Api.Content.Login.FormElement
    ): Model.FormElement {
        return new Model.FormElement({
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
