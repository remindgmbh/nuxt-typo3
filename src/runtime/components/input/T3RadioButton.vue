<template>
    <div class="t3-radio-button">
        <label
            v-for="(optionLabel, optionValue) in options"
            :key="optionValue"
            class="t3-radio-button__option"
            :for="name + optionValue.toString()"
        >
            <input
                :id="name + optionValue.toString()"
                v-model="value"
                autocomplete="off"
                class="t3-radio-button__value"
                :disabled="disabled"
                :name="name"
                :required="required"
                type="radio"
                :value="optionValue.toString()"
                @blur="handleBlur"
            />
            <span class="t3-radio-button__label">{{ optionLabel }}</span>
        </label>
    </div>
</template>

<script setup lang="ts">
import { type RuleExpression, useField } from 'vee-validate'
import { computed } from 'vue'

export interface Props {
    defaultValue?: string
    disabled?: boolean
    name: string
    options: { [key: string]: string }
    required?: boolean
    validation?: RuleExpression<any>
}

const props = defineProps<Props>()

const model = defineModel<string>({ default: '' })

const name = computed(() => props.name)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { value, handleBlur } = useField<string>(
    () => props.name,
    props.validation,
    {
        initialValue: props.defaultValue ?? model.value,
        syncVModel: true,
        type: 'radio',
    },
)

if (props.defaultValue) {
    model.value = props.defaultValue
}
</script>
