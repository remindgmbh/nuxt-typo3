<template>
    <component :is="tag" v-if="label" class="t3-input-label">
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
        label: undefined,
        tag: 'label',
    },
)
</script>
