<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
    console.log('Компонент умер')
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('mousemove', handleMouseMove)
})

function handleScroll() {
    console.log('Страница скролится ура!')
}

function handleMouseMove() {
    console.log('Человек двигает мышкой ура!')
}
</script>

<template>
    <div class="container">
        <h1>Page 1</h1>
        <RouterLink to="/page2">Перейти на 2 Страницу</RouterLink>
    </div>
</template>

<style scoped>
.container {
    min-height: 200dvh;
}
</style>