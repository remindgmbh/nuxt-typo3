import { MixedSchema } from 'yup'
import { computed } from 'vue'
import { Api, Model } from '#nuxt-typo3'

export function useCeFeloginLogin(content: Api.Content.Felogin) {
    const formElements = computed(() =>
        content.data.form.fields.pages
            .filter((field) => field.name !== 'submit')
            .map(convert)
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

    return { formElements }
}
