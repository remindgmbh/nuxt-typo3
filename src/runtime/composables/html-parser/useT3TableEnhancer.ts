import { type Ref, onMounted } from 'vue'
import { useT3Util } from '#imports'

export function useT3TableEnhancer(el: Ref<HTMLElement | undefined>) {
    const { detectScrollEnd } = useT3Util()

    onMounted(() => {
        if (el.value) {
            const tables = el.value.getElementsByTagName('table')
            for (const table of tables) {
                addOverlays(table)
            }
        }
    })

    function addOverlays(table: HTMLTableElement) {
        let container: HTMLElement

        if (table.parentElement?.classList.contains('t3-table')) {
            container = table.parentElement
        } else {
            container = document.createElement('div')
            container.classList.add('t3-table')
            table.replaceWith(container)
        }

        const viewport = document.createElement('div')
        viewport.classList.add('t3-table__viewport')

        const overlayLeft = document.createElement('div')
        overlayLeft.classList.add(
            't3-table__overlay',
            't3-table__overlay--left',
        )

        const overlayRight = document.createElement('div')
        overlayRight.classList.add(
            't3-table__overlay',
            't3-table__overlay--right',
        )

        container.appendChild(overlayLeft)
        container.appendChild(overlayRight)
        viewport.appendChild(table)
        container.appendChild(viewport)

        detectOverlayScrollEnd('left', overlayLeft, table, viewport)
        detectOverlayScrollEnd('right', overlayRight, table, viewport)
    }

    function detectOverlayScrollEnd(
        direction: 'left' | 'right',
        overlay: HTMLDivElement,
        table: HTMLTableElement,
        viewport: HTMLDivElement,
    ) {
        detectScrollEnd(
            table,
            direction,
            (detached) => {
                if (detached) {
                    overlay.classList.add(`t3-table__overlay--visible`)
                } else {
                    overlay.classList.remove(`t3-table__overlay--visible`)
                }
            },
            viewport,
        )
    }
}
