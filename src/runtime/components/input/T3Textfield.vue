<template>
    <div
        class="textfield"
        :class="{
            'textfield--required': required,
            'textfield--disabled': disabled,
            'textfield--error': meta.touched && !meta.valid,
            'textfield--success': meta.touched && meta.valid,
        }"
    >
        <component
            :is="InputLabel"
            class="textfield__label"
            :label="label"
            :for="name"
        />
        <div class="textfield__wrapper">
            <component
                :is="Input"
                v-model="value"
                class="textfield__input"
                :type="type"
                :name="name"
                :min="min"
                :max="max"
                :step="step"
                :placeholder="placeholder"
                :disabled="disabled"
                @blur="handleBlur"
            />
        </div>
        <slot name="error" :error-message="errorMessage"></slot>
    </div>
</template>

<script setup lang="ts">
import { type RuleExpression, useField } from 'vee-validate'
import { computed } from 'vue'
import { useT3DynamicComponent } from '#imports'
import { T3Input, T3InputLabel } from '#components'

const props = defineProps<{
    name: string
    label?: string
    type: 'text' | 'email' | 'number' | 'password' | 'date' | 'time' | 'tel'
    validation?: RuleExpression<any>
    defaultValue?: string | number | boolean
    placeholder?: string
    disabled?: boolean
    step?: number
    min?: number
    max?: number
    required?: boolean
}>()

const Input = useT3DynamicComponent<typeof T3Input>('Input')

const InputLabel = useT3DynamicComponent<typeof T3InputLabel>('InputLabel')

const name = computed(() => props.name)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { value, errorMessage, meta, handleBlur } = useField<
    string | number | boolean | undefined
>(name, props.validation, {
    initialValue: props.defaultValue,
})
</script>

<style lang="scss">
.textfield {
    &__input {
        width: 100%;
        box-sizing: border-box;
    }
}
</style>
