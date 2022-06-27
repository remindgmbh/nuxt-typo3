import { MixedSchema, Schema } from 'yup'
import { Api } from '#nuxt-typo3'

export type FormElementType =
    | 'checkbox'
    | 'checkbox-group'
    | 'date'
    | 'email'
    | 'file'
    | 'number'
    | 'password'
    | 'radio-group'
    | 'row'
    | 'select'
    | 'submit'
    | 'tel'
    | 'text'
    | 'textarea'
    | 'url'

interface IFormElement {
    type: FormElementType
    defaultValue?: any
    name: string
    label?: string
    size?: number
    validation?: Schema
}

interface IFormElementWithOptions extends IFormElement {
    options: { [key: string]: string }
}

interface IFormElementSelect extends IFormElementWithOptions {
    emptyLabel?: string
}

export class FormElement implements IFormElement {
    type: FormElementType
    defaultValue?: any
    name: string
    label?: string
    size?: number
    validation?: Schema

    constructor(formElement: IFormElement) {
        this.type = formElement.type
        this.label = formElement.label
        this.name = formElement.name
        this.defaultValue = formElement.defaultValue
        this.size = formElement.size
        this.validation = formElement.validation
    }

    public static createFromApiFormElement(
        formElement: Api.Form.FormElement
    ): FormElement {
        const f: IFormElement = {
            type: Api.Form.formElementTypeMapping[formElement.type] ?? 'hidden',
            label: formElement.label,
            name: formElement.name,
            defaultValue: formElement.defaultValue,
            size: formElement.properties?.size,
            validation: formElement.validators
                ? formElement.validators.reduce(
                      (result, validator) =>
                          result.concat(
                              Api.Form.getValidationScheme(
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
                    ? formElement.elements.map(
                          FormElement.createFromApiFormElement
                      )
                    : []

                return new FormElementRow({ ...f, formElements })
            }
            case 'MultiCheckbox':
            case 'RadioButton':
                return new FormElementWithOptions({
                    ...f,
                    options: formElement.properties?.options ?? {},
                })
            case 'SingleSelect':
                return new FormElementSelect({
                    ...f,
                    emptyLabel: formElement.properties?.prependOptionLabel,
                    options: formElement.properties?.options ?? {},
                })
            default:
                return new FormElement(f)
        }
    }

    public static createFromApiLoginElement(
        formElement: Api.Login.FormElement
    ): FormElement {
        return new FormElement({
            type:
                Api.Login.formElementTypeMapping[formElement.type] ?? 'hidden',
            label: formElement.label,
            name: formElement.name,
            defaultValue: formElement.value,
            validation: formElement.validate
                ? Object.keys(formElement.validate).reduce(
                      (result, type) =>
                          result.concat(
                              Api.Login.getValidationScheme(
                                  type as Api.Login.ValidationType
                              )
                          ),
                      new MixedSchema()
                  )
                : undefined,
        })
    }

    public isRow(): this is FormElementRow {
        return this.type === 'row'
    }

    public isSelect(): this is FormElementSelect {
        return this.type === 'select'
    }

    public hasOptions(): this is FormElementWithOptions {
        const optionTypes: FormElementType[] = [
            'checkbox-group',
            'radio-group',
            'select',
        ]
        return optionTypes.includes(this.type)
    }
}

interface IFormElementRow extends IFormElement {
    formElements: FormElement[]
}
export class FormElementWithOptions
    extends FormElement
    implements IFormElementWithOptions
{
    options: { [key: string]: string }

    constructor(formElement: IFormElementWithOptions) {
        super(formElement)
        this.options = formElement.options
    }
}

export class FormElementSelect
    extends FormElementWithOptions
    implements IFormElementSelect
{
    emptyLabel?: string

    constructor(formElement: IFormElementSelect) {
        super(formElement)
        this.emptyLabel = formElement.emptyLabel
    }
}

export class FormElementRow extends FormElement implements IFormElementRow {
    formElements: FormElement[]

    constructor(formElement: IFormElementRow) {
        super(formElement)
        this.formElements = formElement.formElements
    }
}
