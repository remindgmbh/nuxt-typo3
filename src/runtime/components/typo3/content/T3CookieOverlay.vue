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
import { type T3Model, useT3CookieConsent } from '#imports'
import { useI18n } from 'vue-i18n'

export interface Props {
    category: T3Model.Typo3.Content.Cookie['category']
    message?: string
}

defineProps<Props>()

const { t } = useI18n()

const { acceptCookies } = useT3CookieConsent()
</script>
