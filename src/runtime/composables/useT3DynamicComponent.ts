import { pascalCase } from 'scule'
import { resolveComponent, getCurrentInstance } from 'vue'
import { useT3Config } from '#imports'

export function useT3DynamicComponent<T>(
    name: string = 'Default',
    prefix: string = ''
): T {
    const { componentPrefix: globalPrefix } = useT3Config()

    const instance = getCurrentInstance()

    const componentNames = []

    if (globalPrefix) {
        componentNames.push(globalPrefix + prefix + pascalCase(name))
        componentNames.push(globalPrefix + prefix + 'Default')
    }

    componentNames.push('T3' + prefix + pascalCase(name))
    componentNames.push('T3' + prefix + 'Default')

    for (const componentName of componentNames) {
        if (instance?.appContext.components[componentName]) {
            return resolveComponent(componentName) as T
        }
    }

    throw new Error(`Component '${componentNames[0]}' not found`)
}
