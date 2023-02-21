<template>
    <div class="t3-cookie-overlay">
        <T3HtmlParser
            v-if="message"
            class="t3-cookie-overlay__message"
            :content="message"
        />
        <div v-else class="t3-cookie-overlay__message">
            {{ t('cookie.message', { category }) }}
        </div>
        <button
            class="t3-cookie-overlay__accept"
            @click="acceptCookies(category)"
        >
            {{ t('cookie.accept', { category }) }}
        </button>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { T3Api } from '#nuxt-typo3'
import { useT3Cookiebot } from '#nuxt-typo3/composables/useT3Cookiebot'

const { t } = useI18n()

const { acceptCookies } = useT3Cookiebot()

defineProps<{
    category: T3Api.Cookie['category']
    message?: string
}>()
</script>
