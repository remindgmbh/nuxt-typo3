<template>
    <r-menu class="menu-example">
        <r-menu-trigger id="item-1" class="menu-example__trigger"
            >trigger 1</r-menu-trigger
        >
        <r-menu-trigger id="item-2" class="menu-example__trigger"
            >trigger 2</r-menu-trigger
        >
        <r-menu-dropdown
            v-slot="{ item }"
            class="menu-example__dropdown"
            :items="items"
            close-on-outside-click
        >
            <div class="menu-example__content">{{ item.content }}</div>
        </r-menu-dropdown>
    </r-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Index extends Vue {
    items = [
        { id: 'item-1', content: 'content for item-1' },
        { id: 'item-2', content: 'content for item-2' },
    ]
}
</script>
<style lang="scss">
.menu-example {
    background-color: lightgrey;
    padding: 1rem;
    position: relative;

    &__trigger {
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    &__dropdown {
        position: absolute;
        top: 100%;
        width: 100%;
        left: 0;
        background-color: grey;
    }

    &__content {
        padding: 1rem;
    }
}
</style>
