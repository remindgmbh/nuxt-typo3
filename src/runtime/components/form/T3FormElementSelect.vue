<template>
    <T3FormElement
        class="t3-form-element--select"
        :error="error"
        :label="label"
        :loading="loading"
        :name="name"
        :required="required"
    >
        <template #input="{ cssClass, errorAriaAttrs }">
            <T3Select
                v-bind="errorAriaAttrs"
                v-model="model"
                :class="cssClass"
                :default-value="defaultValue"
                :disabled="disabled"
                :name="name"
                :options="options"
                :required="required"
                :validation="validation"
            />
        </template>
    </T3FormElement>
</template>

<script setup lang="ts">
import type { FormElementProps } from '@remindgmbh/nuxt-typo3/components/form/T3FormElement.vue'
import type { Props as InputProps } from '@remindgmbh/nuxt-typo3/components/input/T3Select.vue'

export type Props = InputProps & FormElementProps

defineProps<Props>()

const model = defineModel<string>({ default: '' })
</script>
