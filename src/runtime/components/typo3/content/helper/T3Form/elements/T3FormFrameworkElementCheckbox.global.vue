<template>
    <T3FormElementCheckbox
        :default-value="
            formElement.defaultValue ? formElement.defaultValue : false
        "
        :disabled="loading"
        :error="apiError"
        :label="formElement.label"
        :loading="loading"
        :name="formElement.name"
        :required="required"
        :validation="validation"
    />
</template>

<script setup lang="ts">
import type { Props } from '@remindgmbh/nuxt-typo3/components/typo3/content/helper/T3Form/T3FormFrameworkElement.vue'
import { useT3FormElement } from '#imports'

const props = defineProps<Props>()

const { required, validation } = useT3FormElement(props.formElement)
</script>
