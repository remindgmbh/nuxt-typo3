<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'CeWrapper',
    functional: true,
    render(createElement, context) {
        return createElement(
            'div',
            {
                class: 'ce-wrapper',
            },
            context.children
        )
    },
})
</script>
<style lang="scss">
@import 'rmnd-nuxt-typo3/src/assets/styles/defaults.scss';

.ce-wrapper {
    padding: var(--ce-wrapper-padding, #{$ce-wrapper-padding});
}
</style>
