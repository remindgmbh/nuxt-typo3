import { defu } from 'defu'
// import { InitialData } from 'src/api/initialData'
// import { useTypo3Store } from '../stores/typo3'
// import { defineNuxtPlugin } from '#app'
// import Api from '#nuxt-typo3/lib/api'

export default defineNuxtPlugin((nuxtApp) => {
    // const { $axios } = nuxtApp

    const runtimeConfig = nuxtApp.$config && nuxtApp.$config.typo3
    // let options = JSON.parse('<%= JSON.stringify(options) %>')
    let options = {} as any

    if (runtimeConfig) {
        options = defu(runtimeConfig, options)
    }

    // const apiOptions =
    //     store.state.typo3 && store.state.typo3.domain
    //         ? Object.assign(options.api, store.state.typo3.domain.api)
    //         : options.api

    // const api = new Api(options.api, $axios)

    // console.log('context plugin')
    // nuxtApp.hook('app:beforeMount', async () => {
    //     console.log('app:beforeMount')
    //     const typo3Store = useTypo3Store()
    //     const path = useCurrentPath()

    //     console.log(path)

    //     const data = (await useTypo3Api(path, { type: '834' })) as InitialData

    //     typo3Store.setInitialData(data)
    // })

    // console.log(route)

    // const router = useRouter()

    // router.beforeEach((guard) => {
    //     console.log(guard)
    // })

    // addRouteMiddleware(
    //     'i18n',
    //     (to, from) => {
    //         console.log(from)
    //         console.log(to)
    //     },
    //     { global: true }
    // )

    return {
        provide: {
            typo3: {
                options,
            },
        },
    }
})
