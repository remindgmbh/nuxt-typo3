<template>
    <article
        class="t3-content"
        :class="{
            'padded-content': padding,
            ...((!backgroundColorValue || backgroundFullWidth) &&
                containerClasses),
        }"
    >
        <component :is="Component" v-if="cookieAccepted || ignoreCookies" />
        <T3CookieOverlay
            v-else
            :message="contentElement.cookie.message"
            :category="contentElement.cookie.category"
        />
    </article>
</template>

<script setup lang="ts">
import {
    useT3Content,
    useT3ContentInjection,
    useT3DynamicComponent,
} from '#imports'
import { T3CeDefault } from '#components'

const { injectContentElement } = useT3ContentInjection()

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
} = useT3Content()

const Component = useT3DynamicComponent(
    contentElement.value.type,
    'Ce',
    T3CeDefault,
)
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
