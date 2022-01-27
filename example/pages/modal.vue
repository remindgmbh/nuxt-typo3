<template>
    <div class="modal-example">
        <button @click="modalVisible = true">Open Modal</button>
        <t3-modal v-model="modalVisible" close-on-outside-click>
            <t3-modal-background class="modal-example__background" />
            <t3-modal-content class="modal-example__content">
                <button
                    class="modal-example__close"
                    @click="modalVisible = false"
                >
                    x
                </button>
                <div class="modal-example__text">content</div>
            </t3-modal-content>
        </t3-modal>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ModalExample extends Vue {
    modalVisible = false
}
</script>
<style lang="scss">
.modal-example {
    .modal-content-transition {
        &-enter-active,
        &-leave-active {
            transition: transform 1s;
        }

        &-enter,
        &-leave-to {
            transform: translateX(calc(50vw + 50%));
        }

        &-enter-to,
        &-leave {
            transform: translateX(0);
        }
    }

    .modal-background-transition {
        &-enter-active,
        &-leave-active {
            transition: opacity 0.5s;
        }

        &-enter,
        &-leave-to {
            opacity: 0;
        }

        &-enter-to,
        &-leave {
            opacity: 1;
        }
    }

    &__background {
        background-color: rgb(0 0 0 / 25%);
    }

    &__close {
        position: absolute;
        right: 0.25rem;
        top: 0.25rem;
    }

    &__content {
        position: relative;
        background-color: grey;
        padding: 2rem;
        width: 6rem;
        height: 6rem;
        margin: auto;
    }
}
</style>
