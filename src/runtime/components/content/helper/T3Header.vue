<template>
    <component
        :is="tag"
        v-if="visible"
        class="t3-header"
        :class="{
            [`t3-header--${contentElement.content.headerPosition}`]:
                contentElement.content.headerPosition,
            [`t3-header--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <div v-if="contentElement.content.subheader" class="t3-header__sub">
            {{ contentElement.content.subheader }}
        </div>
        <div class="t3-header__main">
            <template v-if="!contentElement.content.headerLink">{{
                contentElement.content.header
            }}</template>
            <T3Link v-else :to="contentElement.content.headerLink">
                {{ contentElement.content.header }}
            </T3Link>
        </div>
    </component>
</template>

<script setup lang="ts">
import { Api, useHeader } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: Api.ContentElement<Api.Content.Base>
}>()

const { visible, tag } = useHeader(props.contentElement.content)
</script>

<style lang="scss">
.t3-header {
    margin: inherit;

    &--center {
        text-align: center;
    }

    &--left {
        text-align: left;
    }

    &--right {
        text-align: right;
    }

    &__sub {
        font-size: initial;
        font-weight: initial;
    }

    &__main {
        a {
            text-decoration: inherit;
            color: inherit;
        }
    }
}
</style>
