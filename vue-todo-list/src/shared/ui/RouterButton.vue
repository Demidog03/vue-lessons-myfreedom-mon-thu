<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = defineProps<{
    to?: string,
    goBack?: boolean
    text: string,
}>()

const router = useRouter()

function goToPage() {
    if (props.goBack && !props?.to) {
        router.back()
    }
    else {
        router.push(props.to!)
    }
}
</script>

<template>
    <button @click="goToPage">{{ text }}</button>
</template>

<style scoped></style>