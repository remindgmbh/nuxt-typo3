// TODO: use RuleExpression Type from vee-validate once this issue is solved: https://github.com/logaretm/vee-validate/issues/3913

declare module 'vee-validate' {
    type YupValidator<TValue = any> = {
        validate(value: TValue, options: Record<string, any>): Promise<TValue>
    }

    type RuleExpression<TValue> =
        | string
        | Record<string, unknown>
        | GenericValidateFunction<TValue>
        | GenericValidateFunction<TValue>[]
        | YupValidator<TValue>
        | undefined

    export { RuleExpression }
}

export {}
