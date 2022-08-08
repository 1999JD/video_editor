<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const goHome = () => {
  if (route.name === 'Home')
    return
  else router.push({ name: 'Home' })
}
</script>

<template>
  <div class="">
    <button @click="goHome">返回首頁</button>
  </div>
</template>