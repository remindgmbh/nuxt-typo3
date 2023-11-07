<template>
    <div class="cookie-overlay">
        <component
            :is="HtmlParser"
            v-if="message"
            class="cookie-overlay__message"
            :content="message"
        />
        <div v-else class="cookie-overlay__message">
            {{ t('cookie.message', { category }) }}
        </div>
        <button class="cookie-overlay__accept" @click="acceptCookies(category)">
            {{ t('cookie.accept', { category }) }}
        </button>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { T3Model, useT3Cookiebot, useT3DynamicComponent } from '#imports'
import { T3HtmlParser } from '#components'

const { t } = useI18n()

const { acceptCookies } = useT3Cookiebot()

defineProps<{
    category: T3Model.Typo3.Content.Cookie['category']
    message?: string
}>()

const HtmlParser = useT3DynamicComponent<typeof T3HtmlParser>('HtmlParser')
</script>
