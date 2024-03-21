<template>
    <T3Link
        v-if="props.file.properties.linkData"
        :to="props.file.properties.linkData"
    >
        <component :is="Component" v-bind="props" />
    </T3Link>
    <component :is="Component" v-else v-bind="props" />
</template>

<script setup lang="ts">
/* eslint-disable vue/no-unused-properties*/
import { T3Model, useT3Asset, useT3DynamicComponent } from '#imports'
import { T3AssetDefault } from '#components'

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

const Component = useT3DynamicComponent(type.value, 'Asset', T3AssetDefault)
</script>
