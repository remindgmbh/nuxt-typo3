<template>
    <div
        class="autocomplete-option-group"
        :class="`autocomplete-option-group--${optionGroup.name}`"
    >
        <div v-if="optionGroup.label" class="autocomplete-option-group__label">
            {{ optionGroup.label }}
        </div>
        <div class="autocomplete-option-group__items">
            <template v-for="option in optionGroup.options" :key="option.key">
                <component
                    :is="AutocompleteOption"
                    :option="option"
                    :hovered="hoverOption === option"
                    :selected="value === option.key"
                    @click="() => emit('select', option)"
                    @mouseover="() => emit('update:hoverOption', option)"
                    @mouseleave="() => emit('update:hoverOption', undefined)"
                />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { T3Model, useT3DynamicComponent } from '#imports'
import { T3AutocompleteOption } from '#components'

defineProps<{
    optionGroup: T3Model.Input.Autocomplete.OptionGroup
    value: string
    hoverOption?: T3Model.Input.Autocomplete.Option
}>()

const AutocompleteOption =
    useT3DynamicComponent<typeof T3AutocompleteOption>('AutocompleteOption')

const emit = defineEmits<{
    (e: 'select', option: T3Model.Input.Autocomplete.Option): void
    (e: 'update:hoverOption', option?: T3Model.Input.Autocomplete.Option): void
}>()
</script>
