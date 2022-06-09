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
        <T3RadioGroup
            v-if="formElement.type === 'radio-group'"
            :name="formElement.name"
            :options="options"
            :label="formElement.label"
            :default-value="formElement.defaultValue"
            :validation="formElement.validation"
        />
        <T3CheckboxGroup
            v-else-if="formElement.type === 'checkbox-group'"
            :name="formElement.name"
            :options="options"
            :label="formElement.label"
            :default-value="formElement.defaultValue"
            :validation="formElement.validation"
        />
        <T3Checkbox
            v-else-if="formElement.type === 'checkbox'"
            :name="formElement.name"
            :label="formElement.label"
            :default-value="formElement.defaultValue"
            :validation="formElement.validation"
        />
        <T3Select
            v-else-if="formElement.isSelect()"
            :name="formElement.name"
            :options="options"
            :label="formElement.label"
            :default-value="formElement.defaultValue"
            :validation="formElement.validation"
            :empty-label="formElement.emptyLabel"
        />
        <T3Textfield
            v-else
            :name="formElement.name"
            :label="formElement.label"
            :default-value="formElement.defaultValue"
            :validation="formElement.validation"
            :type="formElement.type"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Model } from '#nuxt-typo3'

const props = defineProps<{ formElement: Model.FormElement }>()

const options = computed(() =>
    props.formElement.hasOptions() ? props.formElement.options : {}
)
</script>

<style lang="scss">
.t3-form-element {
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
