<template>
    <component
        :is="tag"
        v-if="visible"
        class="t3-header"
        :class="{
            [`t3-header--${content.headerPosition}`]: content.headerPosition,
        }"
    >
        <slot>
            <div v-if="content.subheader" class="t3-header__sub">
                <slot name="sub">
                    {{ content.subheader }}
                </slot>
            </div>
            <div class="t3-header__main">
                <slot name="main">
                    <template v-if="!content.headerLink">{{
                        content.header
                    }}</template>
                    <T3Link v-else :to="content.headerLink">
                        {{ content.header }}
                    </T3Link>
                </slot>
            </div>
        </slot>
    </component>
</template>

<script setup lang="ts">
import { type T3Model, useT3Header } from '#imports'

const props = defineProps<{
    content: T3Model.Typo3.Content.Data.Header
}>()

const { visible, tag } = useT3Header(props.content)
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
