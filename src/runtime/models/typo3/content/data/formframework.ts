import { Form } from './form'
import { Header } from '.'

export interface Formframework extends Header {
    link: string
    form: Form
    bodytext: string
}
