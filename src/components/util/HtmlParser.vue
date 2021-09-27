<template>
    <!-- Just add a css class to allow easier styling -->
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="html-content" v-html="content" />
</template>

<script>
export { default } from 'nuxt-typo3/lib/templates/components/utilities/HtmlParser.vue'
</script>
