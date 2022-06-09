import { Form } from './login'
import { Content } from '.'

export interface ContentLogin extends Content {
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
