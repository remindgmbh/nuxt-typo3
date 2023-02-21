<template>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div ref="el" class="t3-html" v-html="props.content"></div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useT3LinkReplacer } from '#nuxt-typo3/composables/html-parser/useT3LinkReplacer'
import { useT3TableEnhancer } from '#nuxt-typo3/composables/html-parser/useT3TableEnhancer'

const props = defineProps<{
    content: string
}>()

const el = ref<HTMLDivElement>()

const content = computed(() => props.content)

useT3TableEnhancer(el, content)
useT3LinkReplacer(el, content)
</script>

<style lang="scss">
.t3-html {
    :first-child {
        margin-top: 0;
    }

    :last-child {
        margin-bottom: 0;
    }
}
</style>
