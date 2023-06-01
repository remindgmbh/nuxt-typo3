<template>
    <div class="t3-breadcrumbs" :class="{ container }">
        <template
            v-for="breadcrumb in props.breadcrumbs"
            :key="breadcrumb.link"
        >
            <span
                v-if="breadcrumb.current"
                class="t3-breadcrumbs__link t3-breadcrumbs__link--disabled"
                >{{ breadcrumb.title }}</span
            >
            <NuxtLink
                v-else
                class="t3-breadcrumbs__link"
                :to="breadcrumb.link"
                :target="breadcrumb.target"
                >{{ breadcrumb.title }}</NuxtLink
            >
            <span v-if="!breadcrumb.current" class="t3-breadcrumbs__divider" />
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { T3Model, useT3Config } from '#imports'

const config = useT3Config()

const props = defineProps<{ breadcrumbs: T3Model.Typo3.Breadcrumb[] }>()

const container = computed(() => !config.layout.breadcrumbs.fullWidth)
</script>
