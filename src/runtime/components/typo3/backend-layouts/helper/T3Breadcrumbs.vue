<template>
    <div class="t3-breadcrumbs">
        <div class="t3-breadcrumbs__container" :class="{ container }">
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
                <span
                    v-if="!breadcrumb.current"
                    class="t3-breadcrumbs__divider"
                ></span>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { T3Model, useT3Config, useT3Theme } from '#imports'

const config = useT3Config()
const { themeOptions } = useT3Theme()

const props = defineProps<{
    breadcrumbs: T3Model.Typo3.Breadcrumb[]
    backgroundColor: string
}>()

const container = computed(() => !config.layout.breadcrumbs.fullWidth)

const backgroundColor = computed<string | undefined>(
    () => themeOptions.value?.backgroundColors?.[props.backgroundColor]
)
</script>

<style lang="scss">
.t3-breadcrumbs {
    background-color: v-bind(backgroundColor);
}
</style>
