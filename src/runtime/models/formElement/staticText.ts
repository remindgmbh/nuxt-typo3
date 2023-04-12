import { Base } from '.'
import type { IBase } from '.'

interface IStaticText extends IBase {
    text: string
}

export class StaticText extends Base implements IStaticText {
    text: string

    constructor(formElement: IStaticText) {
        super(formElement)
        this.text = formElement.text
    }
}
