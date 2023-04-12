import { RuleExpression } from 'vee-validate'
import type { Type } from '.'
import { Row, WithOptions, Select, Number, StaticText } from '.'

export interface IBase {
    type: Type
    defaultValue?: any
    name: string
    label?: string
    size?: number
    validation?: RuleExpression<any>
    required?: boolean
    placeholder?: string
}

export class Base implements IBase {
    type: Type
    defaultValue?: any
    name: string
    label?: string
    size?: number
    validation?: RuleExpression<any>
    required?: boolean
    placeholder?: string

    constructor(formElement: IBase) {
        this.type = formElement.type
        this.label = formElement.label
        this.name = formElement.name
        this.defaultValue = formElement.defaultValue
        this.size = formElement.size
        this.validation = formElement.validation
        this.required = formElement.required
        this.placeholder = formElement.placeholder
    }

    public isRow(): this is Row {
        return this.type === 'row'
    }

    public isCheckboxGroup(): this is WithOptions {
        return this.type === 'checkbox-group'
    }

    public isRadioGroup(): this is WithOptions {
        return this.type === 'radio-group'
    }

    public isSelect(): this is Select {
        return this.type === 'select'
    }

    public isNumber(): this is Number {
        return this.type === 'number'
    }

    public isStaticText(): this is StaticText {
        return this.type === 'static-text'
    }
}
