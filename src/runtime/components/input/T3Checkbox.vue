<template>
    <div
        class="t3-checkbox"
        :class="{
            't3-checkbox--required': required,
            't3-checkbox--disabled': disabled,
            't3-checkbox--error': meta.touched && !meta.valid,
            't3-checkbox--success': meta.touched && meta.valid,
        }"
    >
        <div class="t3-checkbox__wrapper">
            <input
                :id="name"
                v-model="value"
                class="t3-checkbox__input"
                type="checkbox"
                :name="name"
                :value="value"
                :disabled="disabled"
                @blur="handleBlur"
            />
            <T3InputLabel
                class="t3-checkbox__label"
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

const props = defineProps<{
    name: string
    label: string
    defaultValue?: boolean
    validation?: RuleExpression<any>
    disabled?: boolean
    required?: boolean
}>()

const name = computed(() => props.name)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { errorMessage, meta, value, handleBlur } = useField<
    string[] | boolean | undefined
>(name, props.validation, {
    initialValue: props.defaultValue ?? false,
    type: 'checkbox',
})
</script>

<style lang="scss">
.t3-checkbox {
    &__wrapper {
        display: flex;
        align-items: center;
    }

    &__label {
        position: relative;
    }
}
</style>
