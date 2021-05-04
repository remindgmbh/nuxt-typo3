<template>
    <div class="be-default" :class="{ 'be-container': container }">
        <div class="be-default__before-breadcrumbs">
            <ce-renderer :content="content.colPos1" />
        </div>
        <div v-if="showBreadcrumbs" class="be-default__breadcrumbs">
            <ce-frame>
                <ce-wrapper>
                    <ce-breadcrumbs :items="breadcrumbs" />
                </ce-wrapper>
            </ce-frame>
        </div>
        <div class="be-default__main">
            <ce-renderer :content="content.colPos0" />
        </div>
        <div class="be-default__footer">
            <ce-frame>
                <div class="footer">
                    <div class="footer__left">
                        <ce-renderer :content="content.colPos2" />
                    </div>
                    <div class="footer__center">
                        <ce-renderer :content="content.colPos3" />
                    </div>
                    <div class="footer__right">
                        <ce-renderer :content="content.colPos4" />
                    </div>
                </div>
            </ce-frame>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import baseBe from 'nuxt-typo3/lib/templates/layouts/backend/mixins/baseBe'
import { Breadcrumb } from '../../api/breadcrumb'

@Component({ name: 'BeDefault' })
export default class BeDefault extends mixins(baseBe) {
    @Prop({ type: Array, required: false, default: () => [] })
    breadcrumbs!: Breadcrumb[]

    get container(): boolean {
        return this.$nuxt.context.$rmndTypo3.layout.container
    }

    get showBreadcrumbs(): boolean {
        return this.breadcrumbs.length > 1
    }
}
</script>
<style lang="scss">
@import 'rmnd-nuxt-typo3/src/assets/styles/defaults.scss';

.be-default {
    display: flex;
    flex-direction: column;

    &__footer {
        .footer {
            display: flex;

            &__left,
            &__center,
            &__right {
                width: calc(100% / 3);
            }

            .ce-frame {
                padding: 0;
            }
        }
    }

    &.be-container {
        width: var(--container-width, #{$container-width});
        max-width: 100%;
        margin: 0 auto;

        .ce-frame {
            width: auto;
        }
    }
}
</style>
