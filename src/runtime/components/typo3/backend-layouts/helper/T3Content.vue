<template>
    <article
        class="content"
        :class="{
            'padded-content': padding,
            ...((!backgroundColorValue || backgroundFullWidth) &&
                containerClasses),
        }"
    >
        <component :is="component" v-if="cookieAccepted || ignoreCookies" />
        <component
            :is="CookieOverlay"
            v-else
            :message="contentElement.cookie.message"
            :category="contentElement.cookie.category"
        />
    </article>
</template>

<script setup lang="ts">
import { T3CookieOverlay } from '#components'
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

const component = useT3DynamicComponent(contentElement.value.type, 'Ce')

const CookieOverlay =
    useT3DynamicComponent<typeof T3CookieOverlay>('CookieOverlay')
</script>

<style lang="scss">
.content {
    box-sizing: border-box;
    margin-top: v-bind(spaceBefore);
    margin-bottom: v-bind(spaceAfter);
    padding-top: v-bind(spaceBeforeInside);
    padding-bottom: v-bind(spaceAfterInside);
}
</style>
