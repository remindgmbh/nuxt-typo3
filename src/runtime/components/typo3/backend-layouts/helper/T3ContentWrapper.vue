<template>
    <T3Background v-if="contentElement.appearance.backgroundColor">
        <T3Content />
    </T3Background>
    <T3Content v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { T3Model, useT3Content } from '#imports'

const props = defineProps<{
    contentElement: T3Model.Typo3.Content.Element
}>()

const { provideContentElement } = useT3Content()

provideContentElement(computed(() => props.contentElement))
</script>
