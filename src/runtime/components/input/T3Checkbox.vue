<template>
    <div
        class="checkbox"
        :class="{
            'checkbox--required': required,
            'checkbox--disabled': disabled,
            'checkbox--error': meta.touched && !meta.valid,
            'checkbox--success': meta.touched && meta.valid,
        }"
    >
        <div class="checkbox__wrapper">
            <input
                :id="name"
                v-model="value"
                class="checkbox__input"
                type="checkbox"
                :name="name"
                :value="value"
                :disabled="disabled"
                @blur="handleBlur"
            />
            <component
                :is="InputLabel"
                class="checkbox__label"
                :label="label"
                :for="name"
            />
        </div>
        <slot name="error" :error-message="errorMessage"></slot>
    </div>
</template>

<script setup lang="ts">
import { type RuleExpression, useField } from 'vee-validate'
import { computed } from 'vue'
import { useT3DynamicComponent } from '#imports'
import { T3InputLabel } from '#components'

const props = defineProps<{
    name: string
    label: string
    defaultValue?: boolean
    validation?: RuleExpression<any>
    disabled?: boolean
    required?: boolean
}>()

const InputLabel = useT3DynamicComponent<typeof T3InputLabel>('InputLabel')

const name = computed(() => props.name)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { errorMessage, meta, value, handleBlur } = useField<
    string[] | boolean | undefined
>(name, props.validation, {
    type: 'checkbox',
    initialValue: props.defaultValue ?? false,
})
</script>

<style lang="scss">
.checkbox {
    &__wrapper {
        display: flex;
        align-items: center;
    }

    &__label {
        position: relative;
    }
}
</style>
