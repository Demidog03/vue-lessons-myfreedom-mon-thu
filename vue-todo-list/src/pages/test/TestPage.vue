<script setup lang="ts">
import RouterButton from '@/shared/ui/RouterButton.vue';
import { RouterLink } from 'vue-router';

</script>

<template>
    <RouterLink to="/">Перейти на главную страницу</RouterLink>
    <RouterButton go-back text="Перейти на главную страницу<" />
    <h1>Test Page</h1>
</template>

<style scoped></style>
