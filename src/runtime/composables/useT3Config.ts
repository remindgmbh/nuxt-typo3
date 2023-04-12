import { ModuleOptions } from '../../module'
import { useRuntimeConfig } from '#imports'

export function useT3Config(): ModuleOptions {
    return useRuntimeConfig().public.typo3
}
