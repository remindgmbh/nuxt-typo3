import { MixedSchema } from 'yup'
import { computed } from 'vue'
import { Api, Model } from '#nuxt-typo3'

export function useCeFormFormframework(content: Api.Content.Formframework) {
    const formElements = computed(() => content.form.elements.map(convert))

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

    return { formElements }
}
