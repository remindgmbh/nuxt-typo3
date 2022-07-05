<template>
    <div class="t3-form-group">
        <T3FormElement
            v-for="formElement in formElements"
            :key="formElement.name"
            :form-element="formElement"
            :loading="loading"
        />
    </div>
</template>

<script setup lang="ts">
import { Model } from '#nuxt-typo3'

defineProps<{ formElements: Model.FormElement[]; loading?: boolean }>()
</script>

<style lang="scss">
.t3-form-group {
    display: flex;
    flex-wrap: wrap;
}
</style>
