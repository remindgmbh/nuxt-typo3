<template>
    <component :is="tag" v-if="label" class="input-label">
        <slot>
            {{ label }}
        </slot>
    </component>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        label?: string
        tag?: keyof HTMLElementTagNameMap
    }>(),
    {
        tag: 'label',
        label: undefined,
    }
)
</script>
