<template>
    <div
        class="t3-form-element"
        :class="[
            `t3-form-element--${formElement.type}`,
            {
                [`t3-form-element--size-${formElement.size}`]: formElement.size,
            },
        ]"
    >
        <T3FormStaticText
            v-if="formElement.isStaticText()"
            :header="formElement.label"
            :text="formElement.text"
        />
        <T3RadioGroup
            v-else-if="formElement.isRadioGroup()"
            :name="formElement.name"
            :options="formElement.options"
            :label="formElement.label"
            :default-value="formElement.defaultValue"
            :validation="formElement.validation"
            :required="formElement.required"
            :disabled="loading"
        />
        <T3CheckboxGroup
            v-else-if="formElement.isCheckboxGroup()"
            :name="formElement.name"
            :options="formElement.options"
            :label="formElement.label"
            :default-value="formElement.defaultValue"
            :validation="formElement.validation"
            :required="formElement.required"
            :disabled="loading"
        />
        <T3Checkbox
            v-else-if="formElement.type === 'checkbox'"
            :name="formElement.name"
            :label="formElement.label ?? formElement.name"
            :default-value="formElement.defaultValue"
            :validation="formElement.validation"
            :required="formElement.required"
            :disabled="loading"
        />
        <T3Select
            v-else-if="formElement.isSelect()"
            :name="formElement.name"
            :options="formElement.options"
            :label="formElement.label"
            :default-value="formElement.defaultValue"
            :validation="formElement.validation"
            :empty-label="formElement.emptyLabel"
            :required="formElement.required"
            :disabled="loading"
        />
        <T3Textarea
            v-else-if="formElement.type === 'textarea'"
            :name="formElement.name"
            :label="formElement.label"
            :default-value="formElement.defaultValue"
            :validation="formElement.validation"
            :required="formElement.required"
            :placeholder="formElement.placeholder"
            :disabled="loading"
        />
        <T3Textfield
            v-else
            :name="formElement.name"
            :label="formElement.label"
            :default-value="formElement.defaultValue"
            :validation="formElement.validation"
            :type="formElement.type"
            :required="formElement.required"
            :placeholder="formElement.placeholder"
            :disabled="loading"
            :step="formElement.isNumber() ? formElement.step : undefined"
            :min="formElement.isNumber() ? formElement.min : undefined"
            :max="formElement.isNumber() ? formElement.max : undefined"
        />
    </div>
</template>

<script setup lang="ts">
import { T3Model } from '#imports'

defineProps<{
    formElement: T3Model.FormElement
    loading?: boolean
}>()
</script>

<style lang="scss">
.t3-form-element {
    &--hidden {
        display: none;
    }

    &--size-25 {
        width: 25%;
    }

    &--size-33 {
        width: calc(100% / 3);
    }

    &--size-50 {
        width: 50%;
    }

    &--size-66 {
        width: calc(100% / 3 * 2);
    }

    &--size-75 {
        width: 75%;
    }
}
</style>
