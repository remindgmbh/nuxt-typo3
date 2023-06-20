<template>
    <T3Img v-bind="imageAttrs" />
</template>
<script setup lang="ts">
import { T3Model, useT3Asset } from '#imports'

const props = defineProps<{
    file: T3Model.Typo3.Asset
    assetAttrs?: { [key: string]: any }
}>()

const { imageAttrs } = useT3Asset(props.file, props.assetAttrs)
</script>
