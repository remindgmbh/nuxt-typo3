import type { Header, Login } from './index'

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

export interface Felogin extends Header {
    data: {
        form: Login.Form
        message: Message
        status?: 'success'
        recovery: string
        flashMessages: FlashMessage[]
    }
}

export interface FeloginActionResponse extends Header {
    data: {
        form?: Login.Form
        message?: Message
        flashMessages?: FlashMessage[]
        recovery?: string
        login?: string
        status?: 'success' | 'failure'
        statusCode?: 301
        redirectUrl?: string
    }
}
