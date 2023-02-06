import { Form } from './login'
import { Base } from '.'

interface Message {
    header: string
    message: string
}

interface FlashMessage {
    title: string
    message: string
    severity: number
    className: string
}

export interface Felogin extends Base {
    data: {
        form: Form
        message: Message
        status?: 'success'
        recovery: string
        flashMessages: FlashMessage[]
    }
}

export interface FeloginActionResponse extends Base {
    data: {
        form?: Form
        message?: Message
        flashMessages?: FlashMessage[]
        recovery?: string
        login?: string
        status?: 'success' | 'failure'
        statusCode?: 301
        redirectUrl?: string
    }
}
