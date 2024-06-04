<template>
    <T3InlineSvg
        :description="file.description"
        :src="src"
        :title="file.title"
    />
</template>

<script setup lang="ts">
import { type T3Model, useT3Asset } from '#imports'
import { computed, toRef } from 'vue'

const props = defineProps<{
    file: T3Model.Typo3.Asset.Image
}>()

const { getAssetUrl } = useT3Asset(toRef(() => props.file))

const src = computed(() =>
    props.file.fileReferenceUid ? getAssetUrl('svg') : props.file.url,
)
</script>
