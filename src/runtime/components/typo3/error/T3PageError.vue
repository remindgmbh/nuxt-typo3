<!-- eslint-disable vue/no-v-html -->
<template>
    <div class="t3-page-error">
        <div
            v-if="error.status === 500 && error.html"
            class="t3-page-error__html"
            v-html="error.html"
        ></div>
        <div v-else class="t3-page-error__status">
            {{ error.status }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type { T3Error } from '#imports'

export interface Props {
    error: T3Error.PageError
}

defineProps<Props>()
</script>

<style lang="scss">
.t3-page-error {
    &__html {
        .exception-page {
            height: initial;
        }
    }
}
</style>
