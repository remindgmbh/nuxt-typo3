import { type Ref, onMounted } from 'vue'
import { useT3CookieConsent } from '#imports'

export function useT3CookiesLinkReplacer(el: Ref<HTMLElement | undefined>) {
    const { showBanner } = useT3CookieConsent()

    onMounted(() => {
        if (el.value) {
            const links: NodeListOf<HTMLAnchorElement> =
                el.value.querySelectorAll('a[href^="t3://cookies"]')
            links?.forEach((link) => {
                const params = new URLSearchParams(link.search)
                const action = params.get('action')

                const button = document.createElement('button')
                button.type = 'button'
                button.innerHTML = link.innerHTML
                button.title = link.title

                switch (action) {
                    case 'show-banner':
                        button.addEventListener('click', showBanner)
                        break
                }

                link.replaceWith(button)
            })
        }
    })
}
