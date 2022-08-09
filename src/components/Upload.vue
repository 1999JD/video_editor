<script setup>
import { ref } from 'vue'
import { useStore } from '@/stores/index'

const store = useStore()
const file = ref('file')

function upload() {
  store.videoBlob = file.value.files[0]
}
</script>

<template>
  <div>
    <form @submit.prevent="upload">
      <input ref="file" type="file">
      <button type="submit">確認</button>
    </form>
  </div>
</template>