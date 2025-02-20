<template>
    <T3FormElement
        class="t3-form-element--checkbox-group"
        :error="error"
        :label="label"
        label-tag="legend"
        :loading="loading"
        :name="name"
        :required="required"
        wrapper-tag="fieldset"
    >
        <template #input="{ cssClass, errorAriaAttrs }">
            <T3CheckboxGroup
                v-bind="errorAriaAttrs"
                v-model="model"
                :class="cssClass"
                :default-value="defaultValue"
                :disabled="disabled"
                :name="name"
                :options="options"
                :validation="validation"
            />
        </template>
    </T3FormElement>
</template>

<script setup lang="ts">
import type { DynamicProps as FormElementProps } from '@remindgmbh/nuxt-typo3/components/form/T3FormElement.vue'
import type { Props as InputProps } from '@remindgmbh/nuxt-typo3/components/input/T3CheckboxGroup/T3CheckboxGroup.vue'

export type Props = InputProps & FormElementProps

defineProps<Props>()

const model = defineModel<string[]>({ default: [] })
</script>
