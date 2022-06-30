import { TypoLink } from '..'
import { Form } from './form'
import { Base } from '.'

export interface FormFramework extends Base {
    link: TypoLink
    form: Form
}
