import { onBeforeUnmount, onMounted, Ref, watch } from 'vue'
import { useRouter } from '#app'

export function useLinkReplacer(
    el: Ref<HTMLElement | undefined>,
    content: Ref<string>
) {
    const router = useRouter()
    let links: HTMLCollectionOf<HTMLAnchorElement> | undefined

    onMounted(() => {
        addListeners()
    })

    onBeforeUnmount(removeListeners)

    watch(content, () => {
        removeListeners()
        addListeners()
    })

    function addListeners() {
        if (el.value) {
            links = el.value.getElementsByTagName('a')
            for (const link of links) {
                link.addEventListener('click', navigate, false)
            }
        }
    }

    function removeListeners() {
        if (links) {
            for (const link of links) {
                link.removeEventListener('click', navigate, false)
            }
            links = undefined
        }
    }

    function navigate(event: MouseEvent) {
        let target = event.target as HTMLElement
        let i = 0
        // Go throught 5 parents max to find a tag
        while (
            i < 5 &&
            !(target instanceof HTMLAnchorElement) &&
            target.parentNode
        ) {
            target = target.parentNode as HTMLElement
            i++
        }
        // If target is still not a link, ignore
        if (!(target instanceof HTMLAnchorElement)) {
            return
        }
        return redirect(event, target)
    }

    function redirect(event: MouseEvent, target: HTMLAnchorElement) {
        const href = target.getAttribute('href')
        // Get link target, if local link, navigate with router link
        if (href && href[0] === '/') {
            event.preventDefault()
            router.push(href)
        }
    }
}
