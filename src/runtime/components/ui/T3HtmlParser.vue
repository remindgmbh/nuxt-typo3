<!-- eslint-disable vue/no-v-html -->
<template>
    <T3TableContainer>
        <div
            v-if="content"
            ref="el"
            class="t3-html"
            v-bind="$attrs"
            v-html="content"
        ></div>
    </T3TableContainer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNuxtApp, useT3LinkReplacer, useT3TableEnhancer } from '#imports'

const props = defineProps<{
    content: string
}>()

const el = ref<HTMLDivElement>()

const content = computed(() => props.content)
useT3TableEnhancer(el)

useT3LinkReplacer(el, content)

useNuxtApp().callHook('typo3:parseHtml', el, content)
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
