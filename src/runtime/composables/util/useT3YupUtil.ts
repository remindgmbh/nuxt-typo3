import { Schema, ValidationError } from 'yup'

export function useT3YupUtil() {
    function parseDateString(
        value: any,
        _originalValue: any,
    ): Date | undefined {
        if (value instanceof Date && !isNaN(value.getTime())) {
            return value
        }
    }

    function parseNumber(value: unknown, originalValue: unknown): unknown {
        if (originalValue) {
            return value
        }
    }

    function schemaToValidateFunction(
        schema: Schema,
    ): (value: any) => Promise<string | true> {
        return async (value: any) => {
            try {
                await schema.validate(value)
                return true
            } catch (error: unknown) {
                if (error instanceof ValidationError) {
                    return error.message
                } else {
                    throw error
                }
            }
        }
    }

    return { parseDateString, parseNumber, schemaToValidateFunction }
}
