<template>
    <article
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
        <component :is="component" :id="props.id" :content="props.content" />
    </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
    Appearance,
    Content,
    useContentHelper,
    useDynamicComponent,
} from '#nuxt-typo3'

const props = defineProps<{
    id: number
    type: string
    content: Content
    appearance: Appearance
}>()

const container = computed(() => !useContentHelper().isFullWidth(props.type))
const component = useDynamicComponent('T3Ce', props.type)
</script>

<style lang="scss">
@use '#nuxt-typo3/assets/styles/variables' as *;

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
