<template>
    <article
        class="t3-content"
        :class="{
            'padded-content': padding,
            ...((!backgroundColorValue || backgroundFullWidth) &&
                containerClasses),
        }"
    >
        <component :is="component" v-if="cookieAccepted || ignoreCookies" />
        <T3CookieOverlay
            v-else
            :message="contentElement.cookie.message"
            :category="contentElement.cookie.category"
        />
    </article>
</template>

<script setup lang="ts">
import { useT3DynamicComponent, useT3ContentUtil, useT3Content } from '#imports'

const { injectContentElement } = useT3Content()

const contentElement = injectContentElement()

const {
    backgroundFullWidth,
    backgroundColorValue,
    containerClasses,
    cookieAccepted,
    ignoreCookies,
    padding,
    spaceBefore,
    spaceAfter,
    spaceBeforeInside,
    spaceAfterInside,
} = useT3ContentUtil()

const component = useT3DynamicComponent('T3Ce', contentElement.value.type)
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
