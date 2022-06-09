<template>
    <header
        class="t3-ce-header"
        :class="{
            [`text-${content.headerPosition}`]: content.headerPosition,
        }"
    >
        <div v-if="content.subheader" class="t3-ce-header__sub">
            {{ content.subheader }}
        </div>
        <component :is="tag" v-if="visible" class="t3-ce-header__main">
            <template v-if="!content.headerLink">{{ content.header }}</template>
            <T3Link v-else :to="content.headerLink">
                {{ content.header }}
            </T3Link>
        </component>
    </header>
</template>

<script setup lang="ts">
import { Api, useCeHeader } from '#nuxt-typo3'

const props = defineProps<{
    id: number
    content: Api.Content
}>()

const { visible, tag } = useCeHeader(props)
</script>

<style lang="scss">
.t3-ce-header {
    &__main {
        margin: inherit;

        a {
            text-decoration: inherit;
            color: inherit;
        }
    }
}
</style>
