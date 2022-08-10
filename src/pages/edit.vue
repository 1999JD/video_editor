<script setup>
import { ref } from 'vue'
import { useStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import useFilters from '@/plugins/useFilters'
import { playVideo, stopVideo } from '@/plugins/handlePlayCanvas.js'
import useRecord, { startRecord, stopRecord } from '@/plugins/useRecord'


const store = useStore()
const router = useRouter()
const { videoBlob } = storeToRefs(store)
const canvas = ref('canvas')
const { blob, setBlob } = useRecord()
const { newFilter, removeFilter, filters, setFilters } = useFilters()

const videoElement = document.createElement('video')
if (!videoBlob.value)
  // router.push({ name: 'Home' })
  ''
else {
  videoElement.load()
  videoElement.src = (window.webkitURL || window.URL).createObjectURL(videoBlob.value)
}

function handleCanvas(method) {
  if (method === 'start')
    playVideo(canvas.value, videoElement, filters)
  else if (method === 'stop')
    stopVideo()
}

async function watchIsPlaying(value) {
  if (!value) {
    await stopRecord(setBlob)
    const downloadElement = document.createElement('a')
    downloadElement.href = (window.webkitURL || window.URL).createObjectURL(blob.value)
    downloadElement.download = 'video.webm'
    downloadElement.click()
  }
}

async function download() {
  await startRecord(canvas.value.captureStream(60))
  playVideo(canvas.value, videoElement, filters, watchIsPlaying)
}

</script>

<template>
  <div>
    <h2>第三步</h2>
    <div class="container center">
      <p>編輯你的檔案~</p>
      <main class="flex w-full">
        <div>
          <canvas ref="canvas" width="480" height="270"></canvas>
        </div>
        <div class="w-full">
          <form @submit.prevent="setFilters">
            <label>
              <span>開始時間</span>
              <input v-model="newFilter.starttime" type="number">
            </label>
            <label>
              <span>結束時間</span>
              <input v-model="newFilter.endtime" type="number">
            </label>
            <label>
              選擇濾鏡
              <select v-model="newFilter.filterName">
                <option value="grayscale(80%)">黑白效果</option>
                <option value="blur(4px)">模糊</option>
              </select>
            </label>
            <button type="submit">
              確認
            </button>
          </form>
        </div>
      </main>

      <ul class="grid grid-title grid-style">
        <li>項目</li>
        <li>濾鏡名稱</li>
        <li>開始時間</li>
        <li>結束時間</li>
        <li></li>
      </ul>

      <ul class="w-full grid-wrap">
        <li v-for="filter, index in filters" :key="filter.id" class="grid">
          <p>{{ index + 1 }}</p>
          <p>{{ filter.filterName }}</p>
          <p>{{ filter.starttime }}</p>
          <p>{{ filter.endtime }}</p>
          <button @click="removeFilter(filter.id)"> 移除 </button>
        </li>
      </ul>

      <div class="btn-wrap">
        <button @click="handleCanvas('start')">播放</button>
        <button @click="handleCanvas('stop')">暫停</button>
        <button @click="download">下載</button>
      </div>
    </div>

  </div>
</template>

<style>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  width: fit-content;
}
</style>