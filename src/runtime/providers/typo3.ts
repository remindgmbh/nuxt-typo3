import { useConfig } from '#nuxt-typo3'

export function getImage(
    src: string,
    {
        modifiers = {},
        baseURL = useConfig().api.baseUrl,
    }: { modifiers?: { [key: string]: string }; baseURL?: string }
) {
    let url
    try {
        // new URL throws exception if src is not a valid URL
        url = new URL(src)
    } catch {
        // catch exception and use src as image uid
        url = new URL('image', baseURL)
        url.searchParams.append('uid', src.replace('/', ''))

        if (modifiers.width) {
            url.searchParams.append('maxWidth', modifiers.width)
        }

        if (modifiers.height) {
            url.searchParams.append('maxHeight', modifiers.height)
        }
    }
    return { url: url.toString() }
}
