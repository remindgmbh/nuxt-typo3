<template>
    <t3-topbar-layout
        class="topbar-example"
        :scrollbar-disabled="scrollbarDisabled"
    >
        <t3-topbar-layout-header class="topbar-example__header">
            <div>header</div>
            <button @click="sidebarVisible = !sidebarVisible">
                toggle sidebar
            </button>
        </t3-topbar-layout-header>
        <t3-topbar-layout-content ref="content" class="topbar-example__content">
            <button @click="scrollbarDisabled = !scrollbarDisabled">
                toggle scrollbar
            </button>
        </t3-topbar-layout-content>
        <t3-topbar-layout-sidebar
            v-model="sidebarVisible"
            class="topbar-example__sidebar"
        >
            <div>sidebar content</div>
        </t3-topbar-layout-sidebar>
    </t3-topbar-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TopbarLayoutExample extends Vue {
    scrollbarDisabled = false
    sidebarVisible = false
}
</script>
<style lang="scss">
@forward '../../src/components/layout/T3TopbarLayout/T3TopbarLayout';

.topbar-example {
    height: 32rem;
    overflow-y: scroll;

    &__header {
        padding: 1rem;
        background-color: grey;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__content {
        background-color: lightgrey;
        padding: 1rem;
        padding-top: 12rem;
        min-height: 64rem;
        box-sizing: border-box;
    }

    &__sidebar {
        background-color: black;
        color: white;
        padding: 1rem;
    }
}
</style>
