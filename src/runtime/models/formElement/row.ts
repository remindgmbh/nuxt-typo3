import { Base } from '.'
import type { IBase } from '.'

interface IRow extends IBase {
    formElements: Base[]
}

export class Row extends Base implements IRow {
    formElements: Base[]

    constructor(formElement: IRow) {
        super(formElement)
        this.formElements = formElement.formElements
    }
}
