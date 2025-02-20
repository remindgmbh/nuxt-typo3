<template>
    <T3FormElement
        class="t3-form-element--checkbox"
        :error="error"
        :label="label"
        label-tag="span"
        :loading="loading"
        :name="name"
        :required="required"
        reverse-order
        wrapper-tag="label"
    >
        <template #input="{ cssClass, errorAriaAttrs }">
            <T3Checkbox
                v-bind="errorAriaAttrs"
                v-model="model"
                :class="cssClass"
                :default-value="defaultValue"
                :disabled="disabled"
                :name="name"
                :required="required"
                :validation="validation"
            />
        </template>
    </T3FormElement>
</template>

<script setup lang="ts">
import type { FormElementProps } from '@remindgmbh/nuxt-typo3/components/form/T3FormElement.vue'
import type { Props as InputProps } from '@remindgmbh/nuxt-typo3/components/input/T3Checkbox.vue'

export type Props = InputProps & FormElementProps

defineProps<Props>()

const model = defineModel<boolean>({ default: false })
</script>
