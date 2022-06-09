import { TypoLink } from '..'
import { Form } from './form'
import { Content } from '.'

export interface ContentForm extends Content {
    link: TypoLink
    form: Form
}
