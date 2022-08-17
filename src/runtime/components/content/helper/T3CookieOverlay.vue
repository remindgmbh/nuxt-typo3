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
import { Api, useCookiebot } from '#nuxt-typo3'

const { t } = useI18n()

const { acceptCookies } = useCookiebot()

defineProps<{
    category: Api.Cookie['category']
    message?: string
}>()
</script>
