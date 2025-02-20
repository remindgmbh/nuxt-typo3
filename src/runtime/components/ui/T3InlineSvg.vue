<template>
    <ClientOnly>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <svg :id="id" v-bind="{ ...attributes, ...$attrs }" v-html="html"></svg>
    </ClientOnly>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useId, useLogger, useT3Api } from '#imports'

export interface Props {
    src: string
    title?: string
    description?: string
}

const props = defineProps<Props>()

const logger = useLogger()

const html = ref<string>()
const attributes = ref<{ [key: string]: string }>({})
const api = useT3Api()

const id = useId()

onMounted(async () => {
    await loadSvg()
})

async function loadSvg() {
    try {
        const blob = await api.get<Blob>(props.src, { baseURL: undefined })
        const text = await blob.text()

        const parser = new DOMParser()
        const { documentElement } = parser.parseFromString(
            text,
            'image/svg+xml',
        )

        for (const attribute of documentElement.attributes) {
            if (attribute.name === 'id') {
                continue
            }
            attributes.value[attribute.name] = attribute.value
        }

        const styleElements = documentElement.getElementsByTagName('style')

        try {
            for (const styleElement of styleElements) {
                const cssRules: string[] = []
                const sheet = new CSSStyleSheet()
                sheet.replaceSync(styleElement.innerHTML)

                for (const rule of sheet.cssRules) {
                    if (rule instanceof CSSStyleRule) {
                        rule.selectorText = `#${id} ${rule.selectorText}`
                    }
                    cssRules.push(rule.cssText)
                }

                styleElement.innerHTML = cssRules.join(' ')
            }
        } catch {
            logger.warn(
                "Browser does not support 'CSSStyleSheet() constructor', skipping ID selector for SVG CSS rules",
            )
        }

        if (props.title) {
            const title = document.createElement('title')
            title.textContent = props.title
            documentElement.appendChild(title)
        }

        if (props.description) {
            const desc = document.createElement('desc')
            desc.textContent = props.description
            documentElement.appendChild(desc)
        }

        html.value = documentElement.innerHTML
    } catch (e) {
        logger.error(e)
    }
}

watch(() => props.src, loadSvg)
</script>
