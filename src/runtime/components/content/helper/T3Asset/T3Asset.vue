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
import { T3Api } from '#nuxt-typo3'
import { useT3Asset } from '#nuxt-typo3/composables/useT3Asset'
import { useT3DynamicComponent } from '#nuxt-typo3/composables/useT3DynamicComponent'

const props = defineProps<{
    file: T3Api.Asset
    assetAttrs?: { [key: string]: any }
}>()

const { type } = useT3Asset(props.file)

const component = useT3DynamicComponent('T3Asset', type.value)
</script>
