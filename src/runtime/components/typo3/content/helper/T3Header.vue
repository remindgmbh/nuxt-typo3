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
            <span v-if="content.subheader" class="t3-header__sub">
                <slot name="sub">
                    {{ content.subheader }}
                </slot>
            </span>
            <span class="t3-header__main">
                <template v-if="!content.headerLink">
                    <slot name="main">
                        {{ content.header }}
                    </slot>
                </template>
                <T3Link v-else :to="content.headerLink">
                    <slot name="main">
                        {{ content.header }}
                    </slot>
                </T3Link>
            </span>
        </slot>
    </component>
</template>

<script setup lang="ts">
import { type T3Model, useT3Header } from '#imports'

export interface Props {
    content: T3Model.Typo3.Content.Data.Header
}

export interface Slots {
    default(): any
    sub(): any
    main(): any
}

const props = defineProps<Props>()
defineSlots<Slots>()

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
        display: block;
    }

    &__main {
        display: block;

        a {
            text-decoration: inherit;
            color: inherit;
        }
    }
}
</style>
