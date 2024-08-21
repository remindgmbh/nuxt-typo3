// v-html does not work on dynamic components with ssr: https://github.com/vuejs/core/issues/6435
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(({ vueApp }) => {
    vueApp.directive('html-ssr', {
        getSSRProps(binding) {
            return {
                innerHTML: binding.value,
            }
        },
        mounted: (el: HTMLElement, binding) => {
            el.innerHTML = binding.value
        },
    })
})
