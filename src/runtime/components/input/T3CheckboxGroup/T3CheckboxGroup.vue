<template>
    <div class="t3-checkbox-group">
        <label
            v-for="(optionLabel, optionValue) in options"
            :key="optionValue"
            class="t3-checkbox-group__option"
        >
            <T3CheckboxGroupOption
                v-model="model"
                class="t3-checkbox-group__value"
                :default-value="defaultValue"
                :disabled="disabled"
                :name="name"
                :validation="validation"
                :value="optionValue.toString()"
            />
            <span class="t3-checkbox-group__label">{{ optionLabel }}</span>
        </label>
    </div>
</template>

<script setup lang="ts">
import { type RuleExpression } from 'vee-validate'
import { computed } from 'vue'

export interface Props {
    defaultValue?: string[]
    disabled?: boolean
    name: string
    options: { [key: string]: string }
    validation?: RuleExpression<any>
}

const props = defineProps<Props>()

const name = computed(() => props.name)

const model = defineModel<string[]>({ default: [] })
</script>
