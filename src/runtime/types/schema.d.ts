declare module '@nuxt/schema' {
    interface PublicRuntimeConfig {
        typo3: {
            api: {
                baseUrl: string
                initialDataType: number
            }
            customCssVariables: string
            contentElements: {
                [type: string]: {
                    fullWidth: boolean
                }
            }
        }
    }
}
// It is always important to ensure you import/export something when augmenting a type
export {}
