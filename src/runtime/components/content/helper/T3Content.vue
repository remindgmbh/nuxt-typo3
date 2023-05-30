<template>
    <article
        class="t3-content"
        :class="{
            [containerClass]: containerClass,
            [containerLargeClass]: containerLargeClass,
            [containerMaxWidthClass]: containerMaxWidthClass,
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
import { T3Model, useT3DynamicComponent, useT3ContentUtil } from '#imports'

const props = defineProps<{
    contentElement: T3Model.Typo3.Content.Element
}>()

const {
    containerClass,
    containerLargeClass,
    containerMaxWidthClass,
    cookieAccepted,
    ignoreCookies,
    spaceBefore,
    spaceAfter,
    spaceBeforeInside,
    spaceAfterInside,
} = useT3ContentUtil(props.contentElement)

const component = useT3DynamicComponent('T3Ce', props.contentElement.type)
</script>

<style lang="scss">
.t3-content {
    box-sizing: border-box;
    margin-top: v-bind(spaceBefore);
    margin-bottom: v-bind(spaceAfter);
    padding-top: v-bind(spaceBeforeInside);
    padding-bottom: v-bind(spaceAfterInside);
}
</style>
