<template>
    <t3-accordion :items="items">
        <template #title="{ item }">{{ item.title }}</template>
        <template #content="{ item }">{{ item.content }}</template>
    </t3-accordion>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AccordionExample extends Vue {
    items = [
        { title: 'item-1', content: 'content for item-1' },
        { title: 'item-2', content: 'content for item-2' },
    ]
}
</script>
<style lang="scss">
.t3-accordion {
    &__item {
        background-color: lightgrey;
    }

    &__link {
        cursor: pointer;
        background-color: transparent;
        border: none;
        padding: 1rem;

        &::after {
            content: 'v';
            padding-left: 1rem;
        }

        &--active {
            &::after {
                content: '^';
                padding-left: 1rem;
            }
        }
    }

    &__content {
        background-color: grey;
        padding: 1rem;
    }
}
</style>
