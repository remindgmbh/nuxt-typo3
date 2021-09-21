<template>
    <div class="be-default" :class="{ container }">
        <div class="be-default__before-breadcrumbs">
            <ce-renderer :content="content.colPos1" :options="options" />
        </div>
        <div v-if="showBreadcrumbs" class="be-default__breadcrumbs">
            <ce-frame>
                <ce-wrapper>
                    <ce-breadcrumbs :items="breadcrumbs" />
                </ce-wrapper>
            </ce-frame>
        </div>
        <div class="be-default__main">
            <ce-renderer :content="content.colPos0" :options="options" />
        </div>
        <div class="be-default__footer">
            <ce-renderer :content="content.colPos2" :options="options" />
        </div>
    </div>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import baseBe from 'nuxt-typo3/lib/templates/layouts/backend/mixins/baseBe'
import { mapState } from 'vuex'
import { Breadcrumb } from '../../../api'
import { Options } from '../../../options'

@Component({
    name: 'BeDefault',
    computed: {
        ...mapState({
            breadcrumbs: (state: any) =>
                state.typo3.page.page ? state.typo3.page.page.breadcrumbs : [], // get breadcrumbs for current page,
        }),
    },
})
export default class BeDefault extends mixins(baseBe) {
    breadcrumbs!: Breadcrumb[]

    get container(): boolean {
        return this.options.layout.container
    }

    get options(): Options {
        return this.$nuxt.context.$rmndTypo3
    }

    get showBreadcrumbs(): boolean {
        return this.breadcrumbs.length > 1
    }
}
</script>
