<template>
    <T3FormElement
        class="t3-form-element--autocomplete"
        :error="error"
        :label="label"
        :loading="loading"
        :name="name"
        :required="required"
    >
        <template #input="{ attrs }">
            <T3Autocomplete
                v-bind="attrs"
                v-model="model"
                :aria-label="ariaLabel"
                :default-value="defaultValue"
                :disabled="disabled"
                :name="name"
                :option-groups="optionGroups"
                :placeholder="placeholder"
                :validation="validation"
                @input="(value) => emit('input', value)"
                @select="(value) => emit('select', value)"
            />
        </template>
    </T3FormElement>
</template>

<script setup lang="ts">
import type {
    Emits,
    Props as InputProps,
} from '@remindgmbh/nuxt-typo3/components/input/T3Autocomplete/T3Autocomplete.vue'
import type { DynamicProps as FormElementProps } from '@remindgmbh/nuxt-typo3/components/form/T3FormElement.vue'
import type { T3Model } from '#imports'

export type Props = InputProps & FormElementProps

defineProps<Props>()

const emit = defineEmits<Emits>()

const model = defineModel<T3Model.Input.Autocomplete.Option>({
    default: { key: '', label: '' },
})
</script>
