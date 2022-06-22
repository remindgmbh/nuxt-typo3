<template>
    <div ref="dropdown" class="t3-menu-dropdown">
        <T3CollapseTransition :transition-name="collapseTransitionName">
            <div v-if="activeItem" class="t3-menu-dropdown__content-wrapper">
                <T3AutoHeightContainer class="t3-menu-dropdown__content">
                    <transition :name="changeTransitionName" mode="out-in">
                        <slot :key="activeItem[idField]" :item="activeItem" />
                    </transition>
                </T3AutoHeightContainer>
            </div>
        </T3CollapseTransition>
    </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { activeItemIdSymbol, setActiveItemIdSymbol } from './shared'

const props = withDefaults(
    defineProps<{
        items: any[]
        idField?: string
        collapseTransitionName?: string
        changeTransitionName?: string
    }>(),
    {
        idField: 'id',
        changeTransitionName: 'menu-change-transition',
        collapseTransitionName: 'menu-collapse-transition',
    }
)

const dropdown = ref<HTMLDivElement>()

const activeItemId = inject(activeItemIdSymbol)
const setActiveItemId = inject(setActiveItemIdSymbol)

const activeItem = computed(() =>
    props.items.find((item) => item[props.idField] === activeItemId?.value)
)

function closeOnOutsideClick(e: MouseEvent) {
    if (
        dropdown.value &&
        e.target instanceof Node &&
        !dropdown.value.contains(e.target)
    ) {
        setActiveItemId?.(undefined)
    }
}

watch(activeItem, (value, oldValue) => {
    if (!oldValue && value) {
        document.addEventListener('click', closeOnOutsideClick)
    }
    if (!value) {
        document.removeEventListener('click', closeOnOutsideClick)
    }
})
</script>

<style lang="scss">
@use '#nuxt-typo3/assets/styles/variables' as *;

.t3-menu-dropdown {
    position: absolute;
    top: 100%;
    width: 100%;

    &__content {
        transition: height $transition-duration-menu-change;
    }

    .menu-collapse-transition {
        &-enter-active,
        &-leave-active {
            transition: height $transition-duration-menu-collapse;
        }
    }
}
</style>
