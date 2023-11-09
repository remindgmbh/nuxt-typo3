<template>
    <input :id="name" v-model="value" type="hidden" :name="name" />
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed, watch } from 'vue'
import { T3Model } from '#imports'

const props = defineProps<{
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
}>()

const name = computed(() => props.formElement.name)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { value, setValue } = useField<string | undefined>(name, undefined, {
    initialValue: props.formElement.defaultValue,
})

watch(
    () => props.formElement.defaultValue,
    (value) => setValue(value),
)
</script>
