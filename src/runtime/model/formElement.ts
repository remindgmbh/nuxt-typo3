import { Schema } from 'yup'

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
    | 'static-text'
    | 'submit'
    | 'tel'
    | 'text'
    | 'textarea'
    | 'url'

export interface IFormElement {
    type: FormElementType
    defaultValue?: any
    name: string
    label?: string
    size?: number
    validation?: Schema
    required?: boolean
    placeholder?: string
}

interface IFormElementWithOptions extends IFormElement {
    options: { [key: string]: string }
}

interface IFormElementSelect extends IFormElementWithOptions {
    emptyLabel?: string
}

interface IFormElementStaticText extends IFormElement {
    text: string
}

export class FormElement implements IFormElement {
    type: FormElementType
    defaultValue?: any
    name: string
    label?: string
    size?: number
    validation?: Schema
    required?: boolean
    placeholder?: string

    constructor(formElement: IFormElement) {
        this.type = formElement.type
        this.label = formElement.label
        this.name = formElement.name
        this.defaultValue = formElement.defaultValue
        this.size = formElement.size
        this.validation = formElement.validation
        this.required = formElement.required
        this.placeholder = formElement.placeholder
    }

    public isRow(): this is FormElementRow {
        return this.type === 'row'
    }

    public isCheckboxGroup(): this is FormElementWithOptions {
        return this.type === 'checkbox-group'
    }

    public isRadioGroup(): this is FormElementWithOptions {
        return this.type === 'radio-group'
    }

    public isSelect(): this is FormElementSelect {
        return this.type === 'select'
    }

    public isStaticText(): this is FormElementStaticText {
        return this.type === 'static-text'
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

export class FormElementStaticText
    extends FormElement
    implements IFormElementStaticText
{
    text: string

    constructor(formElement: IFormElementStaticText) {
        super(formElement)
        this.text = formElement.text
    }
}

export class FormElementRow extends FormElement implements IFormElementRow {
    formElements: FormElement[]

    constructor(formElement: IFormElementRow) {
        super(formElement)
        this.formElements = formElement.formElements
    }
}
