<template>
    <NuxtImg v-bind="imageAttrs" />
</template>
<script setup lang="ts">
import { Api, useAsset } from '#nuxt-typo3'

const props = defineProps<{
    file: Api.Asset
    assetAttrs?: { [key: string]: any }
}>()

const { imageAttrs } = useAsset(props.file, props.assetAttrs)
</script>
