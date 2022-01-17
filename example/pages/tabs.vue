<template>
    <r-tabs :items="items">
        <template #title="{ item }">{{ item.title }}</template>
        <template #content="{ item }">{{ item.content }}</template>
    </r-tabs>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TabsExample extends Vue {
    items = [
        { title: 'item-1', content: 'content for item-1' },
        { title: 'item-2', content: 'content for item-2' },
    ]
}
</script>
<style lang="scss">
.r-tabs {
    background-color: lightgrey;

    &__link {
        cursor: pointer;
        background-color: transparent;
        border: none;
        padding: 1rem;

        &--active {
            background-color: grey;
        }
    }

    &__content {
        background-color: grey;
        padding: 1rem;
    }
}
</style>
