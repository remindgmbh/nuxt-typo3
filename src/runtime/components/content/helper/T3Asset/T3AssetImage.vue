<template>
    <T3Img v-bind="imageAttrs" />
</template>
<script setup lang="ts">
import { T3Api, useT3Asset } from '#imports'

const props = defineProps<{
    file: T3Api.Asset
    assetAttrs?: { [key: string]: any }
}>()

const { imageAttrs } = useT3Asset(props.file, props.assetAttrs)
</script>
