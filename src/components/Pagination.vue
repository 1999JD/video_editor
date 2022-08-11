<script setup>
import { useRouter, useRoute } from 'vue-router'
import HomeSvg from '@/components/HomeSvg.vue'
import VideoSvg from '@/components/VideoSvg.vue'
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
    <router-link v-show="route.name !== 'Home'" to="/">
      <HomeSvg width="20px" height="20px" />
      返回首頁
    </router-link>
    <router-link v-show="route.name === 'Record' || route.name === 'Upload'" to="/edit">
      <VideoSvg width="20px" height="20px" />
      前往編輯
    </router-link>
  </div>
</template>