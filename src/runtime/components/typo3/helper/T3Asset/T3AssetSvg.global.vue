<template>
    <T3InlineSvg
        :description="file.properties.description"
        :src="src"
        :title="file.properties.title"
    />
</template>

<script setup lang="ts">
import { type T3Model, useT3Asset } from '#imports'
import { computed, toRef } from 'vue'

const props = defineProps<{
    file: T3Model.Typo3.Asset
}>()

const { getAssetUrl } = useT3Asset(toRef(() => props.file))

const src = computed(() =>
    props.file.properties.fileReferenceUid
        ? getAssetUrl('svg')
        : props.file.publicUrl,
)
</script>
