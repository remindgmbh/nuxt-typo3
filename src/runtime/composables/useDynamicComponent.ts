import { resolveComponent } from 'vue'
import { pascalCase } from 'scule'

export const useDynamicComponent = (prefix: string, name: string) => {
    const componentName = prefix + pascalCase(name)

    const component = resolveComponent(componentName)

    return typeof component === 'string'
        ? resolveComponent(`${prefix}Default`)
        : component
}
