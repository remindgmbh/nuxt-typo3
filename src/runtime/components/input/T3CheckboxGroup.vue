<template>
    <div class="t3-checkbox-group">
        <label
            v-for="(optionLabel, optionValue) in options"
            :key="optionValue"
            class="t3-checkbox-group__option"
            :for="name + optionValue.toString()"
        >
            <input
                :id="name + optionValue.toString()"
                v-model="value"
                class="t3-checkbox-group__value"
                :disabled="disabled"
                :name="name"
                type="checkbox"
                :value="optionValue.toString()"
                @blur="handleBlur"
            />
            <span class="t3-checkbox-group__label">{{ optionLabel }}</span>
        </label>
    </div>
</template>

<script setup lang="ts">
import { type RuleExpression, useField } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps<{
    name: string
    options: { [key: string]: string }
    defaultValue?: string[]
    validation?: RuleExpression<any>
    disabled?: boolean
}>()

const name = computed(() => props.name)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { value, handleBlur } = useField<string[] | boolean | undefined>(
    () => props.name,
    props.validation,
    {
        initialValue: props.defaultValue ?? [],
        type: 'checkbox',
    },
)
</script>
