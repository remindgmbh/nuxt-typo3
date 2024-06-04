<template>
    <T3Link v-if="props.file.link" :to="props.file.link">
        <component :is="Component" v-bind="props" />
    </T3Link>
    <component :is="Component" v-else v-bind="props" />
</template>

<script setup lang="ts">
import { type T3Model, useT3Asset, useT3DynamicComponent } from '#imports'
import { T3AssetDefault } from '#components'
import { toRef } from 'vue'

const props = defineProps<{
    file: T3Model.Typo3.Asset.Base
    fileExtension?: string
    maxHeight?: number
    maxWidth?: number
    sizes?: { [breakpoint: string]: number }
    loop?: boolean
    muted?: boolean
    controls?: boolean
}>()

const { type } = useT3Asset(toRef(() => props.file))

const Component = useT3DynamicComponent(type.value, 'Asset', T3AssetDefault)
</script>
