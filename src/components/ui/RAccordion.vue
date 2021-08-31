<template>
    <div class="r-accordion">
        <section
            v-for="(item, index) in items"
            :key="index"
            class="r-accordion__item"
        >
            <button
                class="r-accordion__link"
                :class="{ 'is-active': activeItems.includes(index) }"
                type="button"
                @click="toggle(index)"
            >
                <slot name="title" :item="item" :index="index"></slot>
            </button>
            <CollapseTransition v-if="!disabledItems.includes(index)">
                <section
                    v-if="activeItems.includes(index)"
                    class="r-accordion__content-wrapper"
                >
                    <div class="r-accordion__content">
                        <slot name="content" :item="item"></slot>
                    </div>
                </section>
            </CollapseTransition>
        </section>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'RAccordion',
})
export default class RAccordion extends Vue {
    @Prop({ type: Array, required: true })
    items!: unknown[]

    @Prop({ type: Boolean, required: false })
    multiple!: boolean

    @Prop({ type: Array, required: false, default: () => [] })
    initialActiveItems!: number[]

    @Prop({ type: Array, required: false, default: () => [] })
    disabledItems!: number[]

    activeItems: number[] = []

    created(): void {
        this.activeItems.push(...this.initialActiveItems)
    }

    toggle(index: number): void {
        if (this.disabledItems.includes(index)) {
            return
        }
        if (this.activeItems.includes(index)) {
            this.activeItems.splice(this.activeItems.indexOf(index), 1)
        } else if (this.multiple) {
            this.activeItems.push(index)
        } else {
            this.activeItems = [index]
        }
    }
}
</script>
