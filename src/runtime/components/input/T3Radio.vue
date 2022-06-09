<template>
    <div class="t3-radio">
        <input
            :id="value"
            v-model="modelValue"
            class="t3-radio__input"
            :value="value"
            type="radio"
            :name="name"
        />
        <label class="t3-radio__label" :for="value">{{ label }}</label>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useField } from 'vee-validate'
import * as yup from 'yup'

const props = defineProps<{
    name: string
    label: string
    value: string
    defaultValue?: string
    validation?: yup.Schema
}>()

const name = computed(() => props.name)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { value: modelValue } = useField<string | undefined>(
    name,
    props.validation,
    {
        initialValue: props.defaultValue,
    }
)
</script>

<style lang="scss">
.t3-radio {
    display: flex;
    align-items: center;

    &__label {
        position: relative;
    }
}
</style>
