<template>
    <transition :name="transitionName">
        <div v-if="visible" class="r-navigation-sidebar-item">
            <slot :items="items" :back="back"></slot>
        </div>
    </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Navigation } from '../../api/navigation'

@Component({
    name: 'RNavigationSidebarItem',
})
export default class RNavigationSidebarItem extends Vue {
    @Prop({ type: Boolean, required: true })
    visible!: boolean

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    @Prop({ type: Object, required: true, default: () => {} })
    navigation!: Navigation

    @Prop({ type: String, required: true })
    transitionName!: string

    get items(): Array<{ title: string; open?: () => void }> {
        return this.navigation.children.map((child) => ({
            title: child.title,
            open: child.children
                ? () => this.$emit('open-sidebar', child.link)
                : undefined,
            link: child.link,
        }))
    }

    back(): void {
        this.$emit('close-sidebar', this.navigation.link)
    }
}
</script>

<style lang="scss">
.r-navigation-sidebar-item {
    z-index: 1;
    position: fixed;
    box-sizing: border-box;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    overflow: auto;
}
</style>
