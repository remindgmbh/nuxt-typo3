<template>
    <T3Link
        v-if="props.file.properties.linkData"
        :to="props.file.properties.linkData"
    >
        <component :is="component" v-bind="props" />
    </T3Link>
    <component :is="component" v-else v-bind="props" />
</template>
<script setup lang="ts">
import { T3Model, useT3DynamicComponent, useT3Asset } from '#imports'

const props = defineProps<{
    file: T3Model.Typo3.Asset
    fileExtension?: string
    maxHeight?: number
    maxWidth?: number
    sizes?: { [breakpoint: string]: number }
    loop?: boolean
    muted?: boolean
    controls?: boolean
}>()

const { type } = useT3Asset(props.file)

const component = useT3DynamicComponent('T3Asset', type.value)
</script>
