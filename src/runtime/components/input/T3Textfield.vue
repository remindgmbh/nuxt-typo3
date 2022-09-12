<template>
    <div
        class="t3-textfield"
        :class="{
            't3-textfield--required': required,
            't3-textfield--disabled': disabled,
        }"
    >
        <label class="t3-textfield__label" :for="name">{{ label }}</label>
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
        <T3CollapseTransition>
            <div v-if="errorMessage" class="t3-textfield__error">
                {{ errorMessage }}
            </div>
        </T3CollapseTransition>
    </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { RuleExpression, useField } from 'vee-validate'

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
@use '#nuxt-typo3/assets/styles/variables' as *;

.t3-textfield {
    &__error {
        color: $color-error;
    }

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

    .collapse-transition {
        &-enter-active,
        &-leave-active {
            transition: height $transition-duration-input-error;
        }
    }
}
</style>
