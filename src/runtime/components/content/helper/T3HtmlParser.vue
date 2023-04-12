<!-- eslint-disable vue/no-v-html -->
<template>
    <div
        v-if="props.content"
        ref="el"
        class="t3-html"
        v-html="props.content"
    ></div>
</template>

<script setup lang="ts">
import { computed, ref, useT3LinkReplacer, useT3TableEnhancer } from '#imports'

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
