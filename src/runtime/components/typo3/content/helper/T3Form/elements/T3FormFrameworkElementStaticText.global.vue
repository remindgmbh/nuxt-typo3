<template>
    <T3FormElement :label="formElement.label" :name="formElement.name">
        <template #input>
            <div class="t3-form-framework-static-text">{{ text }}</div>
        </template>
    </T3FormElement>
</template>

<script setup lang="ts">
import type { Props } from '@remindgmbh/nuxt-typo3/components/typo3/content/helper/T3Form/T3FormFrameworkElement.vue'
import { computed } from 'vue'

const props = defineProps<Props>()

const text = computed(() => props.formElement.properties?.text ?? '')
</script>
