<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const goHome = () => {
  if (route.name === 'Home')
    return
  else router.push({ name: 'Home' })
}

const goEdit = () => {
  router.push({ name: 'Edit' })
}
</script>

<template>
  <div class="">
    <button @click="goHome">返回首頁</button>
    <button v-show="route.name === 'Record' || route.name === 'Upload'" @click="goEdit">前往編輯</button>
  </div>
</template>