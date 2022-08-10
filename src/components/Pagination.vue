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
  <div class="link-wrap">
    <router-link to="/">返回首頁</router-link>
    <router-link v-show="route.name === 'Record' || route.name === 'Upload'" to="/edit">前往編輯</router-link>
  </div>
</template>