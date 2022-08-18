import { MixedSchema } from 'yup'
import { computed, ref } from 'vue'
import { useRouter } from '#app'
import { Api, Model, useApi } from '#nuxt-typo3'

export function useCeFormFormframework(
    contentElement: Api.ContentElement<Api.Content.Formframework>
) {
    const api = useApi()
    const router = useRouter()

    const formElements = computed(() =>
        contentElement.content.form.elements.map(convert)
    )
    const loading = ref(false)

    function convert(
        formElement: Api.Content.Form.FormElement
    ): Model.FormElement {
        const f: Model.IFormElement = {
            type:
                Api.Content.Form.formElementTypeMapping[formElement.type] ??
                'hidden',
            label: formElement.label,
            name: formElement.name,
            defaultValue: formElement.defaultValue,
            size: formElement.properties?.size,
            required: !!formElement.validators?.find(
                (validator) => validator.identifier === 'NotEmpty'
            ),
            placeholder:
                formElement.properties?.fluidAdditionalAttributes?.placeholder,
            validation: formElement.validators
                ? formElement.validators.reduce(
                      (result, validator) =>
                          result.concat(
                              Api.Content.Form.getValidationScheme(
                                  validator.identifier,
                                  validator.options,
                                  formElement.type
                              )
                          ),
                      new MixedSchema()
                  )
                : undefined,
        }

        switch (formElement.type) {
            case 'GridRow': {
                const formElements = formElement.elements
                    ? formElement.elements.map(convert)
                    : []

                return new Model.FormElementRow({ ...f, formElements })
            }
            case 'MultiCheckbox':
                f.defaultValue = formElement.defaultValue || []
                return new Model.FormElementWithOptions({
                    ...f,
                    options: formElement.properties?.options ?? {},
                })
            case 'RadioButton':
                return new Model.FormElementWithOptions({
                    ...f,
                    options: formElement.properties?.options ?? {},
                })
            case 'SingleSelect':
                return new Model.FormElementSelect({
                    ...f,
                    emptyLabel: formElement.properties?.prependOptionLabel,
                    options: formElement.properties?.options ?? {},
                })
            case 'StaticText':
                return new Model.FormElementStaticText({
                    ...f,
                    text: formElement.properties?.text ?? '',
                })
            default:
                return new Model.FormElement(f)
        }
    }

    async function submit(data: Record<string, any>) {
        loading.value = true
        const body = new FormData()
        body.set('responseElementId', contentElement.id.toString())

        Object.keys(data).forEach((key) => {
            body.set(key, data[key] ?? '')
        })

        try {
            const result = await api.post<
                Api.ContentElement<Api.Content.Formframework>
            >(contentElement.content.link.href, { body })

            if (typeof result.content.form === 'string') {
                console.error(result.content.form)
            } else if (
                result.content.form.api.status === 'success' &&
                result.content.form.api.actionAfterSuccess
            ) {
                router.push({
                    path: result.content.form.api.actionAfterSuccess
                        .redirectUrl,
                })
            }
        } finally {
            loading.value = false
        }
    }

    return { formElements, loading, submit }
}
