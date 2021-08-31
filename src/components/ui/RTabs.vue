<template>
    <section class="r-tabs">
        <div class="r-tabs__links">
            <div
                v-for="(item, index) in items"
                :key="index"
                class="r-tabs__link"
                :class="{ 'is-active': activeItem === index }"
                @click="toggle(index)"
            >
                <slot name="title" :item="item"></slot>
            </div>
        </div>
        <RResponsiveHeightContainer class="r-tabs__contents">
            <transition name="tab-change" mode="out-in">
                <template v-for="(item, index) in items">
                    <section
                        v-if="index === activeItem"
                        :key="index"
                        class="r-tabs__content"
                    >
                        <slot name="content" :item="item"></slot>
                    </section>
                </template>
            </transition>
        </RResponsiveHeightContainer>
    </section>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'RTabs',
})
export default class CeTabs extends Vue {
    @Prop({ type: Array, required: true })
    items!: unknown[]

    activeItem = 0

    toggle(index: number): void {
        this.activeItem = index
    }
}
</script>
