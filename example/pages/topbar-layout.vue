<template>
    <r-topbar-layout
        class="topbar-example"
        :scrollbar-disabled="scrollbarDisabled"
    >
        <r-topbar-layout-header class="topbar-example__header">
            <div>header</div>
            <button @click="sidebarVisible = !sidebarVisible">
                toggle sidebar
            </button>
        </r-topbar-layout-header>
        <r-topbar-layout-content ref="content" class="topbar-example__content">
            <button @click="scrollbarDisabled = !scrollbarDisabled">
                toggle scrollbar
            </button>
        </r-topbar-layout-content>
        <r-topbar-layout-sidebar
            v-model="sidebarVisible"
            class="topbar-example__sidebar"
        >
            <div>sidebar content</div>
        </r-topbar-layout-sidebar>
    </r-topbar-layout>
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
@forward '../../src/components/ui/RTopbarLayout/RTopbarLayout';

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
