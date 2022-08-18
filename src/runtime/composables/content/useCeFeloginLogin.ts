import { MixedSchema } from 'yup'
import { computed, ref } from 'vue'
import { Api, Model, useUserState } from '#nuxt-typo3'

export function useCeFeloginLogin(
    contentElement: Api.ContentElement<Api.Content.Felogin>
) {
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

    function convert(
        formElement: Api.Content.Login.FormElement
    ): Model.FormElement {
        return new Model.FormElement({
            type:
                Api.Content.Login.formElementTypeMapping[formElement.type] ??
                'hidden',
            label: formElement.label,
            name: formElement.name,
            defaultValue: formElement.value,
            required: !!formElement.validate?.required,
            validation: formElement.validate
                ? Object.keys(formElement.validate).reduce(
                      (result, type) =>
                          result.concat(
                              Api.Content.Login.getValidationScheme(
                                  type as Api.Content.Login.ValidationType
                              )
                          ),
                      new MixedSchema()
                  )
                : undefined,
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
