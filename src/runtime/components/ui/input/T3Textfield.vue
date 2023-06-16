<template>
    <div
        class="t3-textfield t3-input"
        :class="{
            't3-textfield--required': required,
            't3-textfield--disabled': disabled,
            't3-textfield--error': errorMessage,
            't3-input--required': required,
            't3-input--disabled': disabled,
            't3-input--error': errorMessage,
        }"
    >
        <label class="t3-textfield__label t3-input__label" :for="name">{{
            label
        }}</label>
        <input
            :id="name"
            v-model="value"
            class="t3-textfield__input"
            :type="type"
            :name="name"
            :min="min"
            :max="max"
            :step="step"
            :placeholder="placeholder"
            :disabled="disabled"
        />
        <slot name="error" :error-message="errorMessage">
            <T3InputError
                :error-message="errorMessage"
                class="t3-textfield__error t3-input__error"
            />
        </slot>
    </div>
</template>

<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate'
import { computed, watch } from 'vue'

const props = defineProps<{
    name: string
    label?: string
    type: string
    validation?: RuleExpression<any>
    defaultValue?: string | number | boolean
    required?: boolean
    placeholder?: string
    disabled?: boolean
    step?: number
    min?: number
    max?: number
}>()

const name = computed(() => props.name)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { value, errorMessage, setValue } = useField<
    string | number | boolean | undefined
>(name, props.validation, {
    initialValue: props.defaultValue,
})

if (props.type === 'hidden') {
    watch(() => props.defaultValue, setValue)
}
</script>

<style lang="scss">
.t3-textfield {
    &__input {
        width: 100%;
        box-sizing: border-box;
    }

    &--required & {
        &__label {
            &::after {
                content: '*';
            }
        }
    }
}
</style>
