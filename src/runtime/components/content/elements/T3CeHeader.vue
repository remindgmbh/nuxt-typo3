<template>
    <div
        class="t3-ce-header"
        :class="{
            [`t3-ce-header--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3Header :content-element="contentElement" />
    </div>
</template>

<script setup lang="ts">
import { T3Api } from '#imports'

defineProps<{
    contentElement: T3Api.ContentElement<T3Api.Content.Base>
}>()
</script>
