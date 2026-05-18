<script setup lang="ts">
import Page1 from './Page1.vue'
import Page2 from './Page2.vue'
import { ref } from 'vue'

console.log('Привет')

let title = 'Привет я App.vue!'
title = 'Пока я App.vue!'

// let currentPage: 'Page1' | 'Page2' = 'Page1'
const currentPage = ref('Page1') // реактивная переменная

function goToPage1() {
  currentPage.value = 'Page1' // rerender - перерисовка
  console.log(currentPage.value)
}

function goToPage2() {
  currentPage.value = 'Page2' // rerender - перерисовка
  console.log(currentPage.value)
}

// Observable/Subscriber
</script>

<template>
  <h1 class="title">{{ title }}</h1>
  <!-- conditional render - условная отрисовка -->
  <Page1 v-if="currentPage === 'Page1'" />
  <Page2 v-if="currentPage === 'Page2'" />

  <button @click="goToPage1">Перейти на 1 страницу</button>
  <button @click="goToPage2">Перейти на 2 страницу</button>>
</template>

<style scoped>
.title {
  color: red;
}
</style>
