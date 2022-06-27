export function useInputUtil() {
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

    return {
        parseDateString,
        parseNumber,
    }
}
