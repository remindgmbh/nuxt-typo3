<!-- eslint-disable vue/no-v-html -->
<template>
    <T3TableWrapper>
        <component
            :is="tag"
            v-if="content"
            ref="el"
            v-html-ssr="content"
            class="t3-html"
            v-bind="$attrs"
        />
    </T3TableWrapper>
</template>

<script setup lang="ts">
import { useNuxtApp, useT3LinkReplacer, useT3TableEnhancer } from '#imports'
import { ref } from 'vue'

export interface Props {
    content: string
    tag?: keyof HTMLElementTagNameMap
}

withDefaults(defineProps<Props>(), { tag: 'div' })

const el = ref<HTMLDivElement>()

useT3TableEnhancer(el)
useT3LinkReplacer(el)

useNuxtApp().callHook('typo3:parseHtml', el)
</script>

<style lang="scss">
.t3-html {
    :first-child {
        margin-top: 0;
    }

    :last-child {
        margin-bottom: 0;
    }

    .text-center {
        text-align: center;
    }

    .text-right {
        text-align: end;
    }

    .text-justify {
        text-align: justify;
    }
}
</style>
