<template>
    <div
        class="t3-content"
        :class="{
            container,
            [`t3-content--space-before-${props.appearance.spaceBefore}`]:
                props.appearance.spaceBefore,
            [`t3-content--space-before-inside-${props.appearance.spaceBeforeInside}`]:
                props.appearance.spaceBeforeInside &&
                props.appearance.backgroundColor,
            [`t3-content--space-after-${props.appearance.spaceAfter}`]:
                props.appearance.spaceAfter,
            [`t3-content--space-after-inside-${props.appearance.spaceAfterInside}`]:
                props.appearance.spaceAfterInside &&
                props.appearance.backgroundColor,
        }"
    >
        <component
            :is="ContentElementComponent"
            :id="props.id"
            :content="props.content"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDynamicComponent } from '../composables/useDynamicComponent'
import { Appearance, Content } from '../api'
import { isFullWidth } from '../composables/useContentHelper'

const props = defineProps<{
    id: number
    type: string
    content: Content
    appearance: Appearance
}>()

const container = computed(() => !isFullWidth(props.type))
const ContentElementComponent = useDynamicComponent('T3Ce', props.type)
</script>

<style lang="scss">
@use '../assets/styles/variables' as *;

.t3-content {
    box-sizing: border-box;

    @each $name, $value in $frame-spaces {
        &--space-before-#{$name} {
            margin-top: $value;
        }
        &--space-after-#{$name} {
            margin-bottom: $value;
        }
        &--space-before-inside-#{$name} {
            padding-top: $value;
        }
        &--space-after-inside-#{$name} {
            padding-bottom: $value;
        }
    }
}
</style>
