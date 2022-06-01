import { resolveComponent } from 'vue'
import { pascalCase } from 'scule'

export function useDynamicComponent(prefix: string, name: string = 'Default') {
    const componentName = prefix + pascalCase(name)

    const component = resolveComponent(componentName)

    return typeof component === 'string'
        ? resolveComponent(`${prefix}Default`)
        : component
}
