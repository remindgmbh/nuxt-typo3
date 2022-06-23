<template>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div ref="el" class="t3-html" v-html="props.content"></div>
</template>

<script setup lang="ts">
import { Ref, ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useRouter } from '#app'

const props = defineProps<{
    content: string
}>()

const el = ref<HTMLDivElement>() as Ref<HTMLDivElement>
let links: HTMLCollectionOf<HTMLAnchorElement> | undefined

onMounted(() => {
    nextTick(addListeners)
})

onBeforeUnmount(removeListeners)

watch(
    () => props.content,
    () => {
        removeListeners()
        nextTick(addListeners)
    }
)

function addListeners() {
    links = el.value.getElementsByTagName('a')
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', navigate, false)
    }
}

function removeListeners() {
    if (links) {
        for (let i = 0; i < links.length; i++) {
            links[i].removeEventListener('click', navigate, false)
        }
        links = undefined
    }
}

function navigate(event: MouseEvent) {
    let target = event.target as HTMLElement
    let i = 0
    // Go throught 5 parents max to find a tag
    while (
        i < 5 &&
        !(target instanceof HTMLAnchorElement) &&
        target.parentNode
    ) {
        target = target.parentNode as HTMLElement
        i++
    }
    // If target is still not a link, ignore
    if (!(target instanceof HTMLAnchorElement)) {
        return
    }
    return redirect(event, target)
}

function redirect(event: MouseEvent, target: HTMLAnchorElement) {
    const href = target.getAttribute('href')
    // Get link target, if local link, navigate with router link
    if (href && href[0] === '/') {
        event.preventDefault()
        const router = useRouter()
        router.push(href)
    }
}
</script>

<style lang="scss">
.t3-html {
    :first-child {
        margin-top: 0;
    }

    :last-child {
        margin-bottom: 0;
    }
}
</style>
