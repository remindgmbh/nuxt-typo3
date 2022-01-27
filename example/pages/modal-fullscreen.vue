<template>
    <div class="modal-fullscreen-example">
        <button @click="modalVisible = true">Open Modal</button>
        <t3-modal v-model="modalVisible">
            <t3-modal-content class="modal-fullscreen-example__content">
                <button
                    class="modal-fullscreen-example__close"
                    @click="modalVisible = false"
                >
                    x
                </button>
                <div>content top</div>
                <div>content bottom</div>
            </t3-modal-content>
        </t3-modal>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ModalFullscreenExample extends Vue {
    modalVisible = false
}
</script>
<style lang="scss">
.modal-fullscreen-example {
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

    &__close {
        position: absolute;
        right: 0.25rem;
        top: 0.25rem;
    }

    &__content {
        position: relative;
        background-color: grey;
        padding: 2rem;
        width: 100%;
        height: 110vh;
        margin: auto;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }
}
</style>
