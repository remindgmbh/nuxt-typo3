import { IBase, Base } from '.'

export interface IWithOptions extends IBase {
    options: { [key: string]: string }
}

export class WithOptions extends Base implements IWithOptions {
    options: { [key: string]: string }

    constructor(formElement: IWithOptions) {
        super(formElement)
        this.options = formElement.options
    }
}
