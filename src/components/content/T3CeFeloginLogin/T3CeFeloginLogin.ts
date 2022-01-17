import { CreateElement, VNode, PropType } from 'vue'
import BaseCe from '../../../mixins/components/BaseCe'
import { SET_PAGE } from '../../../pages/Default'

interface LoginForm {
    action: string
    method: string
    fields: {
        action: string
        pages: Array<{
            type: string
            label?: string
            name: string
            validate: any
            options: any
            value?: any
        }>
    }
}

interface LoginData {
    message: {
        header: string
        message: string
    }
    form: LoginForm
}

export default BaseCe.extend({
    name: 'T3CeFeloginLogin',
    props: {
        data: {
            type: [Object, String] as PropType<LoginData | string>,
            required: true,
        },
    },
    computed: {
        formInputs(): Array<{
            name: string
            type: string
            label?: string
            value?: string
        }> {
            return typeof this.data === 'string'
                ? []
                : this.data.form.fields.pages.map((page) => ({
                      name: page.name,
                      type: page.type,
                      label: page.label,
                      value: page.value,
                  }))
        },
        loginType(): string | undefined {
            return typeof this.data !== 'string'
                ? this.data.form.fields.pages.find(
                      (field) => field.name === 'logintype'
                  )?.value
                : undefined
        },
    },
    methods: {
        async submit(data: { [key: string]: any }): Promise<void> {
            if (typeof this.data === 'string') {
                // Should never happend because because when data is string there is no form to submit
                throw new TypeError(
                    "Prop 'data' is of type string, but should be object"
                )
            }

            const formData = Object.keys(data).reduce((result, key) => {
                result.set(key, data[key] || '')
                return result
            }, new FormData())

            const response = await this.$axios.post(
                this.data.form.action,
                formData
            )
            this.$nuxt.$emit(SET_PAGE, response.data)
        },
    },
    render(createElement: CreateElement): VNode {
        const formulateInputs = (isLoading: boolean) => {
            return this.formInputs.map((formInput) => {
                return createElement('FormulateInput', {
                    key: `${this.loginType}-${formInput.name}`,
                    props: {
                        disabled: isLoading,
                        ...formInput,
                    },
                })
            })
        }

        return createElement('div', { class: 't3-ce-login' }, [
            createElement('ce-header', { props: this.$props }),
            typeof this.data === 'string'
                ? createElement('div', { class: 't3-ce-login__text' }, [
                      createElement('html-parser', {
                          props: { content: this.data },
                      }),
                  ])
                : [
                      this.data.message.header || this.data.message.message
                          ? createElement(
                                'div',
                                { class: 't3-ce-login__message' },
                                [
                                    createElement(
                                        'div',
                                        {},
                                        this.data.message.header
                                    ),
                                    createElement(
                                        'div',
                                        {},
                                        this.data.message.message
                                    ),
                                ]
                            )
                          : undefined,
                      createElement('div', { class: 't3-ce-login__form ' }, [
                          createElement('FormulateForm', {
                              on: { submit: this.submit },
                              props: { name: this.loginType },
                              scopedSlots: {
                                  default({
                                      isLoading,
                                  }: {
                                      isLoading: boolean
                                  }): VNode[] {
                                      return [...formulateInputs(isLoading)]
                                  },
                              },
                          }),
                      ]),
                  ],
        ])
    },
})
