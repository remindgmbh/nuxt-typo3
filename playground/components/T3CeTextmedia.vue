<template>
    <div class="pg-ce-textmedia">
        <BaseT3CeTextmedia :content-element="contentElement">
            <template #asset="{ asset }">
                <T3Asset
                    v-if="cookieAccepted"
                    :file="asset"
                    :asset-attrs="imageAttrs"
                />
                <T3CookieOverlay
                    v-else
                    class="pg-ce-textmedia__cookie-overlay"
                    :message="contentElement.cookie.message"
                    :category="contentElement.cookie.category"
                />
            </template>
        </BaseT3CeTextmedia>
    </div>
</template>

<script setup lang="ts">
import { Api } from '#nuxt-typo3'
import BaseT3CeTextmedia from '#nuxt-typo3/components/content/elements/T3CeTextmedia.vue'

const props = defineProps<{
    contentElement: Api.ContentElement<Api.Content.Textmedia>
}>()

const { cookieAccepted } = useContentUtil(props.contentElement)

const { imageAttrs } = useCeTextmedia(props.contentElement)
</script>

<style lang="scss">
.pg-ce-textmedia {
    &__cookie-overlay {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        transform: translateY(-50%);
        text-align: center;
    }
}
</style>
