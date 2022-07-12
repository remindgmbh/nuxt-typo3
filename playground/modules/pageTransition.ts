import { defineNuxtModule } from '@nuxt/kit'

// Workaround until this issue is resolved: https://github.com/nuxt/framework/issues/5729
export default defineNuxtModule({
    setup(_options, nuxt) {
        nuxt.hook('pages:extend', (pages) => {
            for (const page of pages) {
                page.meta = {
                    ...page.meta,
                    pageTransition: {
                        name: 'page-transition',
                    },
                }
            }
        })
    },
})
