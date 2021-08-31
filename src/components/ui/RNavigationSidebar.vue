<template>
    <div class="r-navigation-sidebar">
        <RNavigationSidebarItem
            v-for="sidebar in sidebars"
            :key="sidebar.navItem.link"
            v-slot="{ items, back }"
            :class="sidebarClass"
            :visible="
                sidebarVisible && openSidebars.includes(sidebar.navItem.link)
            "
            :navigation="sidebar.navItem"
            :transition-name="transitionName"
            @open-sidebar="openSidebar"
            @close-sidebar="closeSidebar"
        >
            <slot
                :items="items"
                :back="back"
                :level="sidebar.level"
                :nav-item="sidebar.navItem"
            ></slot>
        </RNavigationSidebarItem>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'
import { Navigation } from '../../api/navigation'

@Component({
    name: 'RNavigationSidebar',
})
export default class RNavigationSidebar extends Vue {
    @Prop({ type: Object, required: true, default: () => {} })
    navigation!: Navigation

    @Prop({ type: Boolean, required: true, default: false })
    value!: boolean

    @Prop({ type: String, required: false, default: '' })
    sidebarClass!: string

    @Prop({
        type: String,
        required: false,
        default: 'navigation-sidebar-transition',
    })
    transitionName!: string

    openSidebars: string[] = []

    get sidebarVisible(): boolean {
        return this.value
    }

    set sidebarVisible(value: boolean) {
        this.$emit('input', value)
    }

    get sidebars(): Array<{ navItem: Navigation; level: number }> {
        return this.getNavItems(this.navigation)
    }

    get rootSidebar(): Navigation {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.sidebars.find((sidebar) => sidebar.level === 0)!.navItem
    }

    getNavItems(
        navigation: Navigation,
        result: Array<{ navItem: Navigation; level: number }> = [],
        level = 0
    ): Array<{ navItem: Navigation; level: number }> {
        if (navigation.children) {
            result.push({ navItem: navigation, level })
            navigation.children
                .filter((child) => child.children)
                .forEach((child) => this.getNavItems(child, result, level + 1))
        }
        return result
    }

    openSidebar(link: string): void {
        this.openSidebars.push(link)
    }

    closeSidebar(link: string): void {
        this.openSidebars.splice(this.openSidebars.indexOf(link), 1)
        if (this.openSidebars.length === 0) {
            this.sidebarVisible = false
        }
    }

    @Watch('sidebarVisible')
    onSidebarVisibleChanged(): void {
        if (this.sidebarVisible) {
            this.openSidebars = [this.rootSidebar.link]
        }
    }

    @Watch('$route')
    onRouteChanged(): void {
        this.sidebarVisible = false
    }
}
</script>

<style lang="scss"></style>
