import Vue, { CreateElement, RenderContext } from 'vue'

export default Vue.component('CollapseTransition', {
    functional: true,
    render(createElement: CreateElement, context: RenderContext) {
        const data = {
            props: {
                name: 'collapse',
            },
            on: {
                beforeEnter(el: HTMLElement) {
                    el.style.height = '0'
                },
                enter(el: HTMLElement) {
                    el.style.overflowY = 'hidden'
                    el.style.height = `${el.scrollHeight}px`
                },
                afterEnter(el: HTMLElement) {
                    el.style.height = ''
                    el.style.overflowY = ''
                },
                beforeLeave(el: HTMLElement) {
                    el.style.height = `${el.scrollHeight}px`
                },
                leave(el: HTMLElement) {
                    if (el.scrollHeight !== 0) {
                        el.style.overflowY = 'hidden'
                        el.style.height = '0'
                    }
                },
                afterLeave(el: HTMLElement) {
                    el.style.height = ''
                    el.style.overflowY = ''
                },
            },
        }
        return createElement('transition', data, context.children)
    },
})
