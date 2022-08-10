import { onMounted, Ref, watch } from 'vue'
import { useUtil } from '#nuxt-typo3'

export function useTableEnhancer(
    el: Ref<HTMLElement | undefined>,
    content: Ref<string>
) {
    const { detectScrollEnd } = useUtil()

    onMounted(() => {
        addOverlays()
    })

    watch(content, addOverlays)

    function addOverlays() {
        if (el.value) {
            const tables = el.value.getElementsByTagName('table')
            for (const table of tables) {
                const container = document.createElement('div')
                container.classList.add('t3-table')

                table.replaceWith(container)

                const viewport = document.createElement('div')
                viewport.classList.add('t3-table__viewport')

                const overlayLeft = document.createElement('div')
                overlayLeft.classList.add('t3-table__overlay-left')

                const overlayRight = document.createElement('div')
                overlayRight.classList.add('t3-table__overlay-right')

                container.appendChild(overlayLeft)
                container.appendChild(overlayRight)
                viewport.appendChild(table)
                container.appendChild(viewport)

                detectScrollEnd(
                    table,
                    'left',
                    (detached) => {
                        if (detached) {
                            overlayLeft.classList.add(
                                't3-table__overlay-left--visible'
                            )
                        } else {
                            overlayLeft.classList.remove(
                                't3-table__overlay-left--visible'
                            )
                        }
                    },
                    viewport
                )

                detectScrollEnd(
                    table,
                    'right',
                    (detached) => {
                        if (detached) {
                            overlayRight.classList.add(
                                't3-table__overlay-right--visible'
                            )
                        } else {
                            overlayRight.classList.remove(
                                't3-table__overlay-right--visible'
                            )
                        }
                    },
                    viewport
                )
            }
        }
    }
}
