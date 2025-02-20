<template>
    <T3FormElement
        class="t3-form-element--file-upload"
        :error="error"
        :label="label"
        :loading="loading"
        :name="name"
        :required="required"
    >
        <template #input="{ cssClass, errorAriaAttrs }">
            <T3FileUpload
                :class="cssClass"
                :disabled="disabled"
                :mime-types="mimeTypes"
                :multiple="multiple"
                :name="name"
                :placeholder="placeholder"
                :required="required"
                :validation="validation"
                v-bind="errorAriaAttrs"
            />
        </template>
    </T3FormElement>
</template>

<script setup lang="ts">
import type { FormElementProps } from '@remindgmbh/nuxt-typo3/components/form/T3FormElement.vue'
import type { Props as InputProps } from '@remindgmbh/nuxt-typo3/components/input/T3FileUpload.vue'

export type Props = InputProps & FormElementProps

defineProps<Props>()
</script>
