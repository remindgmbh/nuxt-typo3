<template>
    <div
        class="t3-textarea t3-input"
        :class="{
            't3-textarea--required': required,
            't3-textarea--disabled': disabled,
            't3-textarea--error': meta.touched && !meta.valid,
            't3-textarea--success': meta.touched && meta.valid,
            't3-input--required': required,
            't3-input--disabled': disabled,
            't3-input--error': meta.touched && !meta.valid,
            't3-input--success': meta.touched && meta.valid,
        }"
    >
        <label class="t3-textarea__label t3-input__label" :for="name">{{
            label
        }}</label>
        <div class="t3-textarea__wrapper">
            <textarea
                :id="name"
                v-model="value"
                class="t3-textarea__input"
                :name="name"
                :placeholder="placeholder"
                :disabled="disabled"
                @blur="handleBlur"
            />
        </div>
        <slot name="error" :error-message="errorMessage">
            <T3InputError
                :error-message="errorMessage"
                class="t3-textarea__error t3-input__error"
            />
        </slot>
    </div>
</template>

<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps<{
    name: string
    label?: string
    validation?: RuleExpression<any>
    defaultValue?: string | number
    placeholder?: string
    disabled?: boolean
    required?: boolean
}>()

const name = computed(() => props.name)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { value, errorMessage, meta, handleBlur } = useField(
    name,
    props.validation,
    {
        initialValue: props.defaultValue,
    }
)
</script>

<style lang="scss">
.t3-textarea {
    &__input {
        width: 100%;
        box-sizing: border-box;
    }
}
</style>
