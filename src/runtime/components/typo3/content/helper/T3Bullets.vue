<template>
    <component :is="tag" class="t3-bullets">
        <li
            v-for="item in content.bodytext"
            :key="item"
            class="t3-bullets__item"
        >
            {{ item }}
        </li>
    </component>
</template>

<script setup lang="ts">
import { type T3Model, useT3Bullets } from '#imports'

export interface Props {
    content: T3Model.Typo3.Content.Data.Bullets
}

const props = defineProps<Props>()

const { tag } = useT3Bullets(props.content)
</script>
