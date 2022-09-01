<template>
    <T3Link
        v-if="props.file.properties.linkData"
        :to="props.file.properties.linkData"
    >
        <component :is="component" :file="file" :asset-attrs="assetAttrs" />
    </T3Link>
    <component :is="component" v-else :file="file" :asset-attrs="assetAttrs" />
</template>
<script setup lang="ts">
import { Api, useAsset, useDynamicComponent } from '#nuxt-typo3'

const props = defineProps<{
    file: Api.Asset
    assetAttrs?: { [key: string]: any }
}>()

const { type } = useAsset(props.file)

const component = useDynamicComponent('T3Asset', type.value)
</script>
