import { Base } from '.'
import type { IBase } from '.'

interface INumber extends IBase {
    step: number
    min?: number
    max?: number
}

export class Number extends Base implements INumber {
    step: number
    min?: number
    max?: number

    constructor(formElement: INumber) {
        super(formElement)
        this.step = formElement.step
        this.min = formElement.min
        this.max = formElement.max
    }
}
