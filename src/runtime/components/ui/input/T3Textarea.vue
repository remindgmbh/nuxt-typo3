<template>
    <div class="t3-textarea t3-input">
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
}>()

const name = computed(() => props.name)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { value, errorMessage, handleBlur } = useField(name, props.validation, {
    initialValue: props.defaultValue,
})
</script>

<style lang="scss">
.t3-textarea {
    &__input {
        width: 100%;
        box-sizing: border-box;
    }
}
</style>
