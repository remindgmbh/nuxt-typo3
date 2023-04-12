<template>
    <div
        class="t3-textarea t3-input"
        :class="{
            't3-textarea--required': required,
            't3-textarea--disabled': disabled,
            't3-input--required': required,
            't3-input--disabled': disabled,
        }"
    >
        <label class="t3-textarea__label t3-input__label" :for="name">{{
            label
        }}</label>
        <textarea
            :id="name"
            v-model="value"
            class="t3-textarea__input"
            :name="name"
            :placeholder="placeholder"
            :disabled="disabled"
        />
        <T3CollapseTransition transition-name="error-transition">
            <div v-if="errorMessage" class="t3-textarea__error t3-input__error">
                {{ errorMessage }}
            </div>
        </T3CollapseTransition>
    </div>
</template>

<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate'
import { computed } from '#imports'

const props = defineProps<{
    name: string
    label?: string
    validation?: RuleExpression<any>
    defaultValue?: string | number
    required?: boolean
    placeholder?: string
    disabled?: boolean
}>()

const name = computed(() => props.name)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { value, errorMessage } = useField(name, props.validation, {
    initialValue: props.defaultValue,
})
</script>

<style lang="scss">
.t3-textarea {
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
