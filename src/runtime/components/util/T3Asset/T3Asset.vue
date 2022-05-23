<template>
    <T3Link
        v-if="props.file.properties.linkData"
        :to="props.file.properties.linkData"
    >
        <component :is="component" :file="file" />
    </T3Link>
    <component :is="component" v-else :file="file" />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { Asset } from '#nuxt-typo3/api'
import { useDynamicComponent } from '#nuxt-typo3/composables/useDynamicComponent'

const props = defineProps<{ file: Asset }>()

const type = computed(() => {
    switch (props.file.properties.type) {
        case 'video': {
            if (
                ['youtube', 'vimeo'].includes(props.file.properties.extension)
            ) {
                return 'video-embedded'
            }
            return 'video'
        }
        case 'audio':
            return 'audio'
        case 'image':
            return 'image'
        default:
            return 'default'
    }
})

const component = useDynamicComponent('T3Asset', type.value)
</script>
