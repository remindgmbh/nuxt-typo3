import { WithOptions } from '.'
import type { IWithOptions } from '.'

interface ISelect extends IWithOptions {
    emptyLabel?: string
}

export class Select extends WithOptions implements ISelect {
    emptyLabel?: string

    constructor(formElement: ISelect) {
        super(formElement)
        this.emptyLabel = formElement.emptyLabel
    }
}
