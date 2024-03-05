<template>
    <ClientOnly>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <svg :id="id" v-bind="attributes" v-html="html"></svg>
    </ClientOnly>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { compileString } from 'sass'
import { useId } from '#imports'

const props = defineProps<{
    src: string
}>()

const html = ref<string>()
const attributes = ref<{ [key: string]: string }>({})

const id = useId()

onMounted(async () => {
    await loadSvg()
})

async function loadSvg() {
    const blob = await $fetch<Blob>(props.src)
    const text = await blob.text()

    const parser = new DOMParser()
    const { documentElement } = parser.parseFromString(text, 'image/svg+xml')

    for (const attribute of documentElement.attributes) {
        if (attribute.name === 'id') {
            continue
        }
        attributes.value[attribute.name] = attribute.value
    }

    const styleElements = documentElement.getElementsByTagName('style')

    for (const styleElement of styleElements) {
        const { css } = compileString(`#${id} { ${styleElement.innerHTML} }`)
        styleElement.innerHTML = css
    }

    html.value = documentElement.innerHTML
}

watch(() => props.src, loadSvg)
</script>
