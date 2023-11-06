<template>
    <div class="t3-ce-bullets">
        <T3Header
            class="t3-ce-bullets__header"
            :content="contentElement.content"
        />
        <component :is="tag" class="t3-ce-bullets__list">
            <li
                v-for="item in contentElement.content.bodytext"
                :key="item"
                class="t3-ce-bullets__item"
            >
                {{ item }}
            </li>
        </component>
    </div>
</template>

<script setup lang="ts">
import { T3Model, useT3CeBullets, useT3Content } from '#imports'

const { injectContentElement } = useT3Content()

const contentElement =
    injectContentElement<T3Model.Typo3.Content.Data.Bullets>()

const { tag } = useT3CeBullets(contentElement)
</script>
