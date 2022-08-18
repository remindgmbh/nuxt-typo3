<template>
    <div class="pg-ce-textmedia">
        <DefaultT3CeTextmedia :content-element="contentElement">
            <template #asset="{ asset }">
                <T3Asset v-if="cookieAccepted" :file="asset" />
                <T3CookieOverlay
                    v-else
                    class="pg-ce-textmedia__cookie-overlay"
                    :message="contentElement.cookie.message"
                    :category="contentElement.cookie.category"
                />
            </template>
        </DefaultT3CeTextmedia>
    </div>
</template>

<script setup lang="ts">
import {
    Api,
    useContentUtil,
    T3CeTextmedia as DefaultT3CeTextmedia,
} from '#nuxt-typo3'

const props = defineProps<{
    contentElement: Api.ContentElement<Api.Content.Textmedia>
}>()

const { cookieAccepted } = useContentUtil(props.contentElement)
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
