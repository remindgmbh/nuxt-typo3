import { MetaObject } from '@nuxt/schema'
import { useHead } from '#head'
import { PageData } from '../api'

export const usePageHead = (pageData: PageData) => {
    const title = pageData.breadcrumbs.find((bc) => bc.current)?.title
    const meta = pageData.meta

    // TODO add canonical
    // const canonical = meta.canonical

    const head: MetaObject = {
        title: meta.title || title, // || this.$nuxt.$options.head.title,
        htmlAttrs: {
            lang: pageData.i18n.find((language) => language.active)
                ?.twoLetterIsoCode,
        },
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: meta.description,
            },
            {
                hid: 'robots',
                name: 'robots',
                content: Object.keys(meta.robots)
                    .filter(
                        (key) => meta.robots[key as keyof typeof meta.robots]
                    )
                    .join(', '),
            },
            {
                hid: 'twitter:title',
                name: 'twitter:title',
                content: meta.twitterTitle || meta.title || title,
                // || this.$nuxt.$options.head.title,
            },
            {
                hid: 'twitter:description',
                name: 'twitter:description',
                content: meta.twitterDescription,
            },
            {
                hid: 'twitter:card',
                name: 'twitter:card',
                content: meta.twitterCard,
            },
            {
                hid: 'og:title',
                property: 'og:title',
                content: meta.ogTitle || meta.title || title,
                // || this.$nuxt.$options.head.title,
            },
            {
                hid: 'og:description',
                name: 'og:description',
                content: meta.ogDescription || meta.description,
            },
            {
                hid: 'og:type',
                property: 'og:type',
                content: 'website',
            },
        ],
    }

    if (meta.twitterImage) {
        head.meta?.push({
            hid: `twitter:image:${meta.twitterImage.properties.uidLocal}`,
            name: 'twitter:image',
            content: meta.twitterImage.publicUrl,
        })
    }

    if (meta.ogImage) {
        head.meta?.push({
            hid: `og:image:${meta.ogImage.properties.uidLocal}`,
            name: 'og:image',
            content: meta.ogImage.publicUrl,
        })
    }

    // if (canonical && canonical.href) {
    //     const url = `${baseUrl}${meta.canonical.href}`

    //     head.link.push({
    //         rel: 'canonical',
    //         href: url,
    //     })

    //     head.meta.push({
    //         hid: 'og:url',
    //         property: 'og:url',
    //         content: url,
    //     })
    // }

    return useHead(head)
}
