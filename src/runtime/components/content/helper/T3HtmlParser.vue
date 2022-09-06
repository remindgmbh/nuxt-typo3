<template>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div ref="el" class="t3-html" v-html="props.content"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { computed } from '@vue/reactivity'
import { useLinkReplacer, useTableEnhancer } from '#nuxt-typo3'

const props = defineProps<{
    content: string
}>()

const el = ref<HTMLDivElement>()

const content = computed(() => props.content)

useTableEnhancer(el, content)
useLinkReplacer(el, content)
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
