import { describe, expect, it } from 'vitest'
import { useUtil } from '../../src/runtime/composables/useUtil'

const util = useUtil()

describe('capitalize', () => {
    it('should capitalize the first character in a string', () => {
        expect(util.capitalize('test')).toBe('Test')
    })
})

describe('padNumber', () => {
    it('should pad a number with as many zeros to match the length of maxValue', () => {
        expect(util.padNumber(10, 100)).toBe('010')
    })
    it('return the value as string if maxValue has as less characters than value', () => {
        expect(util.padNumber(100, 10)).toBe('100')
    })
    it('return the value as string if maxValue has as many characters as value', () => {
        expect(util.padNumber(100, 100)).toBe('100')
    })
})
