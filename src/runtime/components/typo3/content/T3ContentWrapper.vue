<template>
    <T3Background v-if="contentElement.appearance.backgroundColor">
        <T3Content />
    </T3Background>
    <T3Content v-else />
</template>

<script setup lang="ts">
import { type T3Model, useT3ContentInjection } from '#imports'
import { computed } from 'vue'

export interface Props {
    contentElement: T3Model.Typo3.Content.Element
}

const props = defineProps<Props>()

const { provideContentElement } = useT3ContentInjection()

provideContentElement(computed(() => props.contentElement))
</script>
