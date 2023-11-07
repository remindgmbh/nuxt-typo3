<template>
    <component
        :is="Background"
        v-if="contentElement.appearance.backgroundColor"
    >
        <component :is="Content" />
    </component>
    <component :is="Content" v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { T3Model, useT3Content, useT3DynamicComponent } from '#imports'
import { T3Background, T3Content } from '#components'

const props = defineProps<{
    contentElement: T3Model.Typo3.Content.Element
}>()

const { provideContentElement } = useT3Content()

provideContentElement(computed(() => props.contentElement))

const Background = useT3DynamicComponent<typeof T3Background>('Background')
const Content = useT3DynamicComponent<typeof T3Content>('Content')
</script>
