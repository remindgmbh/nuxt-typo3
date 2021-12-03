<template>
    <div class="examples">
        <nuxt-link to="/menu">menu</nuxt-link>
        <nuxt-link to="/tabs">tabs</nuxt-link>
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
