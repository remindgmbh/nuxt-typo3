<template>
    <video
        :autoplay="!!file.properties.autoplay"
        :controls="controls"
        :loop="loop"
        :muted="muted"
        :preload="file.properties.lazyLoading ? 'none' : undefined"
        :src="src"
    ></video>
</template>

<script setup lang="ts">
import { type T3Model, useT3Asset } from '#imports'
import { computed, toRef } from 'vue'

const props = defineProps<{
    file: T3Model.Typo3.Asset
    loop?: boolean
    muted?: boolean
    controls?: boolean
}>()

const { getAssetUrl } = useT3Asset(toRef(() => props.file))

const src = computed(() =>
    props.file.properties.fileReferenceUid
        ? getAssetUrl()
        : props.file.publicUrl,
)
</script>
