<template>
    <div class="t3-checkbox" :class="{ 't3-checkbox--required': required }">
        <div class="t3-checkbox__wrapper">
            <input
                :id="key"
                class="t3-checkbox__input"
                type="checkbox"
                :name="name"
                :value="key"
                :checked="checked"
                @click="handleChange(checkedValue)"
            />
            <label class="t3-checkbox__label" :for="key">{{ label }}</label>
        </div>
        <T3CollapseTransition>
            <div v-if="!multi && errorMessage" class="t3-checkbox__error">
                {{ errorMessage }}
            </div>
        </T3CollapseTransition>
    </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed } from 'vue'
import { Schema } from 'yup'

const props = defineProps<{
    name: string
    label: string
    value?: string
    defaultValue?: string[] | true
    multi?: boolean
    validation?: Schema
    groupLabel?: string
    required?: boolean
}>()

const name = computed(() => props.name)
const key = computed(() => props.value ?? props.name)
const checkedValue = computed(() => (props.multi ? props.value : true))
const checked = computed(
    () =>
        props.defaultValue === true ||
        (!!props.value && props.defaultValue?.includes(props.value))
)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { errorMessage, handleChange } = useField<string[] | true | undefined>(
    name,
    props.validation?.label(props.multi ? props.groupLabel ?? '' : props.label),
    {
        type: 'checkbox',
        initialValue: props.defaultValue,
    }
)
</script>

<style lang="scss">
@use '#nuxt-typo3/assets/styles/variables' as *;

.t3-checkbox {
    &__wrapper {
        display: flex;
        align-items: center;
    }

    &__label {
        position: relative;
    }

    &__error {
        color: $color-error;
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
