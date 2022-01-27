<template>
    <div class="examples">
        <nuxt-link to="/accordion">accordion</nuxt-link>
        <nuxt-link to="/menu">menu</nuxt-link>
        <nuxt-link to="/modal">modal</nuxt-link>
        <nuxt-link to="/modal-fullscreen">modal-fullscreen</nuxt-link>
        <nuxt-link to="/scroll-indicator">scroll-indicator</nuxt-link>
        <nuxt-link to="/scroll-indicator-component"
            >scroll-indicator-component</nuxt-link
        >
        <nuxt-link to="/tabs">tabs</nuxt-link>
        <nuxt-link to="/topbar-layout">topbar-layout</nuxt-link>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Index extends Vue {}
</script>

<style lang="scss">
.examples {
    display: flex;
    flex-direction: column;
}
</style>
