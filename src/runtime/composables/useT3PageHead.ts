import { MetaObject } from '@nuxt/schema'
import * as T3Model from '../models'
import { useHead, useT3Config } from '#imports'

export function useT3PageHead(pageData: T3Model.Typo3.Page.Data) {
    const title = pageData.breadcrumbs.find((bc) => bc.current)?.title
    const meta = pageData.meta

    const head: MetaObject = {
        title: meta.title || title,
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

    if (meta.canonical && meta.canonical.href) {
        const config = useT3Config()
        const baseUrl = config.baseUrl
        const url = `${baseUrl}${meta.canonical.href}`

        head.link = [
            {
                rel: 'canonical',
                href: url,
            },
        ]

        head.meta?.push({
            hid: 'og:url',
            property: 'og:url',
            content: url,
        })
    }

    return useHead(head)
}
