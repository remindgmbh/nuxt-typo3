import { Form } from './login'
import { Base } from '.'

export interface FeLogin extends Base {
    data: {
        form: Form
        message: {
            header: string
            message: string
        }
        recovery: any
        flashMessages: any
    }
}
