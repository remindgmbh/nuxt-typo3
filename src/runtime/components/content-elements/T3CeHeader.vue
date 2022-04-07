<template>
    <header
        class="t3-ce-header"
        :class="{
            [`text-${props.content.headerPosition}`]:
                props.content.headerPosition,
        }"
    >
        <div v-if="props.content.subheader" class="t3-ce-header__sub">
            {{ props.content.subheader }}
        </div>
        <component :is="tag" v-if="visible" class="t3-ce-header__main">
            <template v-if="!props.content.headerLink">{{
                props.content.header
            }}</template>
            <T3Link v-else :to="props.content.headerLink">
                {{ props.content.header }}
            </T3Link>
        </component>
    </header>
</template>

<script setup lang="ts">
import { Content } from 'src/api'

const props = defineProps<{
    id: number
    content: Content
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
