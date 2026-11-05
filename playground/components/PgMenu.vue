<template>
    <div v-if="active === 'menu'" class="pg-menu">
        <div>top</div>
        <button @click="close">close</button>
        <div v-for="i in 100" :key="i">{{ i }}</div>
        <div>bottom</div>
    </div>
</template>

<script setup lang="ts">
import { useT3LayoutInjection } from '#imports'

const { injectMenu } = useT3LayoutInjection()
const { active, close } = injectMenu()
</script>

<style lang="scss">
.pg-menu {
    box-sizing: border-box;
    min-height: 100%;
}
</style>
