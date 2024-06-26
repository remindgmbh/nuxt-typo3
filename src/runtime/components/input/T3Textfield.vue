<template>
    <div
        class="t3-textfield"
        :class="{
            't3-textfield--required': required,
            't3-textfield--disabled': disabled,
            't3-textfield--error': meta.touched && !meta.valid,
            't3-textfield--success': meta.touched && meta.valid,
        }"
    >
        <T3InputLabel class="t3-textfield__label" :for="name" :label="label" />
        <div class="t3-textfield__wrapper">
            <T3Input
                v-model="value"
                class="t3-textfield__input"
                :disabled="disabled"
                :max="max"
                :min="min"
                :name="name"
                :placeholder="placeholder"
                :step="step"
                :type="type"
                @blur="handleBlur"
            />
        </div>
        <slot :error-message="errorMessage" name="error"></slot>
    </div>
</template>

<script setup lang="ts">
import { type RuleExpression, useField } from 'vee-validate'
import { computed } from 'vue'

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

const name = computed(() => props.name)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { value, errorMessage, meta, handleBlur } = useField<
    string | number | boolean | undefined
>(name, props.validation, {
    initialValue: props.defaultValue,
})
</script>

<style lang="scss">
.t3-textfield {
    &__input {
        width: 100%;
        box-sizing: border-box;
    }
}
</style>
