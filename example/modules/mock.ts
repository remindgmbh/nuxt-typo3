import { Module } from '@nuxt/types'
import { server } from '../mocks/server'

const nuxtModule: Module = function () {
    this.nuxt.hook('listen', () => {
        server.listen()
    })

    this.nuxt.hook('close', () => {
        server.close()
    })
}

export default nuxtModule
