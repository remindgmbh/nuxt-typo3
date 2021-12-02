<template>
    <div>
        <h1>
            <template v-if="!isIndexPage">
                <nuxt-link to="/">{{ indexName }}</nuxt-link>
                <span>/</span>
            </template>
            <span>{{ currentRouteTitle }}</span>
        </h1>
        <nuxt />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Index extends Vue {
    get indexName(): string {
        return 'index'
    }

    get currentRouteTitle(): string {
        return this.isIndexPage
            ? this.indexName
            : this.$nuxt.$route.name ?? this.$nuxt.$route.path
    }

    get isIndexPage(): boolean {
        return this.$nuxt.$route.path === '/'
    }
}
</script>
