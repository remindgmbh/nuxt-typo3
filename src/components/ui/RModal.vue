<template>
    <!-- 
        https://github.com/LinusBorg/vue-simple-portal
        use vue-simple-portal to render modal as direct child of body to allow positioning over header
     -->
    <Portal>
        <transition :name="transitionName">
            <div v-if="value" class="r-modal">
                <slot />
            </div>
        </transition>
    </Portal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Portal } from '@linusborg/vue-simple-portal'

@Component({
    name: 'RModal',
    components: {
        Portal,
    },
})
export default class RModal extends Vue {
    @Prop({ type: Boolean, required: true, default: false })
    value!: boolean

    @Prop({ type: String, required: false, default: 'modal-transition' })
    transitionName!: string
}
</script>

<style lang="scss">
.r-modal {
    top: 0;
    left: 0;
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 1;
    overflow-y: auto;
}
</style>
