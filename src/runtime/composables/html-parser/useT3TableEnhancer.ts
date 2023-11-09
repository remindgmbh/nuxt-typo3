import { type Ref, onMounted, watch } from 'vue'
import { useT3Util } from '#imports'

export function useT3TableEnhancer(
    el: Ref<HTMLElement | undefined>,
    content: Ref<string>,
) {
    const { detectScrollEnd } = useT3Util()

    onMounted(() => {
        addOverlays()
    })

    watch(content, addOverlays)

    function addOverlays() {
        if (el.value) {
            const tables = el.value.getElementsByTagName('table')
            for (const table of tables) {
                const container = document.createElement('div')
                container.classList.add('table')

                table.replaceWith(container)

                const viewport = document.createElement('div')
                viewport.classList.add('table__viewport')

                const overlayLeft = document.createElement('div')
                overlayLeft.classList.add('table__overlay-left')

                const overlayRight = document.createElement('div')
                overlayRight.classList.add('table__overlay-right')

                container.appendChild(overlayLeft)
                container.appendChild(overlayRight)
                viewport.appendChild(table)
                container.appendChild(viewport)

                detectOverlayScrollEnd('left', overlayLeft, table, viewport)
                detectOverlayScrollEnd('right', overlayRight, table, viewport)
            }
        }
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
                    overlay.classList.add(
                        `table__overlay-${direction}--visible`,
                    )
                } else {
                    overlay.classList.remove(
                        `table__overlay-${direction}--visible`,
                    )
                }
            },
            viewport,
        )
    }
}
