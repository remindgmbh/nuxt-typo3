<template>
    <video
        :autoplay="!!file.autoplay"
        :controls="controls"
        :loop="loop"
        :muted="muted"
        :preload="file.lazyLoading ? 'none' : undefined"
        :src="src"
    ></video>
</template>

<script setup lang="ts">
import { type T3Model, useT3Asset } from '#imports'
import { computed, toRef } from 'vue'

export interface Props {
    file: T3Model.Typo3.Asset.Video
    loop?: boolean
    muted?: boolean
    controls?: boolean
}

const props = defineProps<Props>()

const { getAssetUrl } = useT3Asset(toRef(() => props.file))

const src = computed(() =>
    props.file.fileReferenceUid ? getAssetUrl() : props.file.url,
)
</script>
