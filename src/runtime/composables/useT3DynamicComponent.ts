import { type Component, getCurrentInstance, resolveComponent } from 'vue'
import { pascalCase } from 'scule'
import { useT3Config } from '#imports'

export function useT3DynamicComponent(
    dynamicNamePart: string | undefined,
    staticNamePart: string,
    fallbackComponent: Component,
) {
    const { componentPrefix } = useT3Config()

    const instance = getCurrentInstance()

    const componentNames = []

    if (dynamicNamePart) {
        if (componentPrefix) {
            componentNames.push(
                componentPrefix + staticNamePart + pascalCase(dynamicNamePart),
            )
        }

        componentNames.push('T3' + staticNamePart + pascalCase(dynamicNamePart))
    }

    for (const componentName of componentNames) {
        if (instance?.appContext.components[componentName]) {
            return resolveComponent(componentName)
        }
    }

    return fallbackComponent
}
