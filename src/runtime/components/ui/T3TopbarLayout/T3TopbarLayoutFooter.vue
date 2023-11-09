<template>
    <component :is="tag" class="topbar-layout-footer">
        <slot />
    </component>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        tag?: keyof HTMLElementTagNameMap
    }>(),
    { tag: 'footer' },
)
</script>
