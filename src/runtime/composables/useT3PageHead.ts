/* eslint-disable @typescript-eslint/no-invalid-void-type */
import type * as T3Model from '../models'
import type { ActiveHeadEntry, MergeHead, UseHeadInput } from '@unhead/vue'
import { useHead, useT3Config } from '#imports'
import { type MetaObject } from '@nuxt/schema'

// Temporary explicit return type until this issue is fixed: https://github.com/nuxt/module-builder/issues/224
export function useT3PageHead(
    pageData: T3Model.Typo3.Page.Data,
): void | ActiveHeadEntry<UseHeadInput<MergeHead>> {
    const title = pageData.breadcrumbs.find((bc) => bc.current)?.title
    const { meta } = pageData

    const head: MetaObject = {
        htmlAttrs: {
            lang: pageData.i18n.find((language) => language.active)
                ?.twoLetterIsoCode,
        },
        meta: [
            {
                content: meta.description,
                hid: 'description',
                name: 'description',
            },
            {
                content: Object.keys(meta.robots)
                    .filter(
                        (key) => meta.robots[key as keyof typeof meta.robots],
                    )
                    .join(', '),
                hid: 'robots',
                name: 'robots',
            },
            {
                content: meta.twitterTitle || meta.title || title,
                hid: 'twitter:title',
                name: 'twitter:title',
            },
            {
                content: meta.twitterDescription,
                hid: 'twitter:description',
                name: 'twitter:description',
            },
            {
                content: meta.twitterCard,
                hid: 'twitter:card',
                name: 'twitter:card',
            },
            {
                content: meta.ogTitle || meta.title || title,
                hid: 'og:title',
                property: 'og:title',
            },
            {
                content: meta.ogDescription || meta.description,
                hid: 'og:description',
                name: 'og:description',
            },
            {
                content: 'website',
                hid: 'og:type',
                property: 'og:type',
            },
        ],
        title: meta.title || title,
    }

    if (meta.twitterImage) {
        head.meta?.push({
            content: meta.twitterImage.publicUrl,
            hid: `twitter:image:${meta.twitterImage.properties.uidLocal}`,
            name: 'twitter:image',
        })
    }

    if (meta.ogImage) {
        head.meta?.push({
            content: meta.ogImage.publicUrl,
            hid: `og:image:${meta.ogImage.properties.uidLocal}`,
            name: 'og:image',
        })
    }

    if (meta.canonical && meta.canonical.href) {
        const config = useT3Config()
        const { baseUrl } = config
        const url = `${baseUrl}${meta.canonical.href}`

        head.link = [
            {
                href: url,
                rel: 'canonical',
            },
        ]

        head.meta?.push({
            content: url,
            hid: 'og:url',
            property: 'og:url',
        })
    }

    return useHead(head)
}
