<template>
    <T3Background v-if="contentElement.appearance.backgroundColor">
        <T3Content />
    </T3Background>
    <T3Content v-else />
</template>

<script setup lang="ts">
import { T3Model, useT3ContentInjection } from '#imports'
import { computed } from 'vue'

const props = defineProps<{
    contentElement: T3Model.Typo3.Content.Element
}>()

const { provideContentElement } = useT3ContentInjection()

provideContentElement(computed(() => props.contentElement))
</script>
