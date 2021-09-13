import 'vue'

declare module 'vue/types/vue' {
    interface Vue {
        $formulate: {
            handle: (
                err: typeof Error,
                formName: string,
                skip?: boolean
            ) => void | typeof Error
            reset: <V>(formName: string, initialValue?: V) => void
            resetValidation: (formName: string) => void
            setValues: <V>(formName: string, values: V) => void
        }
    }
}
