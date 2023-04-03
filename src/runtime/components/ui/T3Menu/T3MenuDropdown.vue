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
import { useLogger } from '#nuxt-logger'
import { activeItemIdSymbol, setActiveItemIdSymbol } from './shared'

const logger = useLogger()

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

const itemWithoutId = props.items.find((item) => item[props.idField] == null)

if (itemWithoutId) {
    logger.warn(
        `At least one menu item does not have a property called '${props.idField}'`
    )
} else {
    const uniqueIds = new Set(props.items.map((item) => item[props.idField]))

    if (uniqueIds.size < props.items.length) {
        logger.warn(
            `Multiple items with same value for field '${props.idField}' found`
        )
    }
}

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
        setActiveItemId?.(null)
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
.t3-menu-dropdown {
    position: absolute;
    top: 100%;
    width: 100%;
}
</style>
