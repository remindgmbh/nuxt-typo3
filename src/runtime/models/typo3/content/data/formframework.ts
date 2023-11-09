import type { Form } from './form'
import type { Header } from '.'

export interface Formframework extends Header {
    link: string
    form: Form
    bodytext: string
}
