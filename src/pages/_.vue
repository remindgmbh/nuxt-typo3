<template>
    <div class="page">
        <be-dynamic
            :page="page.page"
            :content="page.content"
            :type="backendLayout"
        />
    </div>
</template>

<script src="nuxt-typo3/lib/templates/pages/_.vue" />

<style lang="scss">
.page {
    width: 100%;
}
</style>
