<template>
    <div class="r-topbar-layout" :class="{ 'r-topbar-layout--dense': !top }">
        <header class="r-topbar-layout__bar">
            <slot name="bar" :expanded="top"></slot>
        </header>
        <main ref="content" class="r-topbar-layout__content">
            <slot name="content" :expanded="!top"></slot>
        </main>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { ScrollIndicator } from '../../util/scroll-indicator'

@Component({ name: 'RTopbarLayout' })
export default class RTopbarLayout extends Vue {
    @Prop({ type: Boolean, required: false, default: false })
    scrollbarDisabled!: boolean

    scrollPosition = 0
    top = true

    get content(): HTMLElement {
        return this.$refs.content as HTMLElement
    }

    mounted(): void {
        const scrollIndicator = new ScrollIndicator({
            content: document.body,
            direction: 'top',
        })

        scrollIndicator.watch((detached) => {
            if (this.content.style.position !== 'fixed') {
                this.top = !detached
            }
        })
    }

    @Watch('scrollbarDisabled')
    onScrollbarDisabledChanged(): void {
        if (this.scrollbarDisabled) {
            this.scrollPosition = pageYOffset
            this.content.style.top = `${-this.scrollPosition}px`
            this.content.style.position = 'fixed'
        } else {
            this.content.style.position = ''
            this.content.style.top = '0'
            window.scrollTo({ top: this.scrollPosition })
        }
    }
}
</script>

<style lang="scss">
.r-topbar-layout {
    &__bar {
        height: var(--top-bar-height);
        position: fixed;
        width: 100%;
        z-index: 1;
    }

    &__content {
        padding-top: var(--top-bar-height);
        min-height: calc(100vh - var(--top-bar-height));
        position: relative;
        z-index: 0;
        width: 100%;
        display: flex;
    }
}
</style>
