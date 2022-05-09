<template>
    <component
        :is="ContentElementComponent"
        :id="props.id"
        :content="props.content"
    />
</template>

<script setup lang="ts">
import { useDynamicComponent } from '../composables/useDynamicComponent'
import { Content } from '../api'

const props = defineProps<{
    id: number
    type: string
    content: Content
}>()

const ContentElementComponent = useDynamicComponent('T3Ce', props.type)
</script>
