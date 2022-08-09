import { Form } from './login'
import { Base } from '.'

export interface Felogin extends Base {
    data:
        | {
              form: Form
              message: {
                  header: string
                  message: string
              }
              recovery: any
              flashMessages: any
          }
        | string
}
