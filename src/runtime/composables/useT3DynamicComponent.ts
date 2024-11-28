import { type Component, getCurrentInstance, resolveComponent } from 'vue'
import { useAppConfig, useLogger } from '#imports'
import { pascalCase } from 'scule'

export function useT3DynamicComponent(
    dynamicNamePart: string | undefined,
    staticNamePart: string,
    fallbackComponent: Component,
) {
    if (dynamicNamePart) {
        const logger = useLogger()
        const { typo3: config } = useAppConfig()
        const instance = getCurrentInstance()
        const componentNames = []

        if (config.componentPrefix) {
            componentNames.push(
                config.componentPrefix +
                    staticNamePart +
                    pascalCase(dynamicNamePart),
            )
        }

        componentNames.push(`T3${staticNamePart}${pascalCase(dynamicNamePart)}`)

        for (const componentName of componentNames) {
            if (instance?.appContext.components[componentName]) {
                return resolveComponent(componentName)
            }
        }

        logger.warn(`Failed to resolve component`, componentNames)
    }

    return fallbackComponent
}
