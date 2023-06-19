<template>
    <div class="t3-checkbox t3-input">
        <div class="t3-checkbox__wrapper">
            <input
                :id="key"
                v-model="value"
                class="t3-checkbox__input"
                type="checkbox"
                :name="name"
                :value="key"
                :disabled="disabled"
                @blur="handleBlur"
            />
            <label
                class="t3-checkbox__label"
                :class="{ 't3-input__label': !multi }"
                :for="key"
                >{{ label }}</label
            >
        </div>
        <slot name="error" :error-message="errorMessage"></slot>
    </div>
</template>

<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps<{
    name: string
    label: string
    value?: string
    defaultValue?: string[] | boolean
    multi?: boolean
    validation?: RuleExpression<any>
    groupLabel?: string
    disabled?: boolean
}>()

const name = computed(() => props.name)
const key = computed(() => (props.value ? props.value : props.name))

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { errorMessage, value, handleBlur } = useField<
    string[] | boolean | undefined
>(name, props.validation, {
    type: 'checkbox',
    initialValue: props.defaultValue ?? (props.multi ? [] : false),
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
