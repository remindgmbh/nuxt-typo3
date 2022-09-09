import { Schema, ValidationError } from 'yup'

export function useYupUtil() {
    function parseDateString(value: any, _originalValue: any) {
        if (value instanceof Date && !isNaN(value.getTime())) {
            return value
        }
    }

    function parseNumber(value: any, originalValue: any) {
        if (originalValue) {
            return value
        }
    }

    function schemaToValidateFunction(schema: Schema) {
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
