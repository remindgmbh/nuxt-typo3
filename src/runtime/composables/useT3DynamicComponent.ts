import { pascalCase } from 'scule'
import { resolveComponent } from 'vue'

export function useT3DynamicComponent(
    prefix: string,
    name: string = 'Default'
) {
    const componentName = prefix + pascalCase(name)

    const component = resolveComponent(componentName)

    return typeof component === 'string'
        ? resolveComponent(`${prefix}Default`)
        : component
}
