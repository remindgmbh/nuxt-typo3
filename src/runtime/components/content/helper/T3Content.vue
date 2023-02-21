<template>
    <article
        class="t3-content"
        :class="{
            container: !isFullWidth,
            [`t3-content--space-before-${contentElement.appearance.spaceBefore}`]:
                contentElement.appearance.spaceBefore,
            [`t3-content--space-before-inside-${contentElement.appearance.spaceBeforeInside}`]:
                contentElement.appearance.spaceBeforeInside &&
                contentElement.appearance.backgroundColor,
            [`t3-content--space-after-${contentElement.appearance.spaceAfter}`]:
                contentElement.appearance.spaceAfter,
            [`t3-content--space-after-inside-${contentElement.appearance.spaceAfterInside}`]:
                contentElement.appearance.spaceAfterInside &&
                contentElement.appearance.backgroundColor,
        }"
    >
        <component
            :is="component"
            v-if="cookieAccepted || ignoreCookies"
            :content-element="contentElement"
        />
        <T3CookieOverlay
            v-else
            :message="contentElement.cookie.message"
            :category="contentElement.cookie.category"
        />
    </article>
</template>

<script setup lang="ts">
import { T3Api } from '#nuxt-typo3'
import { useT3ContentUtil } from '#nuxt-typo3/composables/useT3ContentUtil'
import { useT3DynamicComponent } from '#nuxt-typo3/composables/useT3DynamicComponent'

const props = defineProps<{
    contentElement: T3Api.ContentElement
}>()

const { cookieAccepted, ignoreCookies, isFullWidth } = useT3ContentUtil(
    props.contentElement
)

const component = useT3DynamicComponent('T3Ce', props.contentElement.type)
</script>

<style lang="scss">
@use '#nuxt-typo3/assets/styles/sizes' as sizes;

.t3-content {
    box-sizing: border-box;

    @each $name, $value in sizes.$frame-spaces {
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
