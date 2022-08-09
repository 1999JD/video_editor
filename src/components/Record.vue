<script setup>
import useStream from '@/plugins/useStream'
import useRecord, { startRecord, stopRecord } from '@/plugins/useRecord'
import { useStore } from '@/stores/index'
import { ref } from 'vue'

const { stream, setStream } = useStream()
const { blob, setBlob } = useRecord()
const store = useStore()

const isRecording = ref(false)


const handleRecord = async () => {
  if (!isRecording.value) {
    await startRecord(stream.value)
    isRecording.value = true
  }
  else {
    await stopRecord(setBlob)
    store.videoBlob = blob
    isRecording.value = false
  }
}
</script>

<template>
  <div>
    <div>
      <video width="480" height="270" :ref="(el) => {
        try {
          el.srcObject = stream
        } catch (_err) {
          return
        }
      }" autoplay controls />
    </div>
    <button @click="setStream('user')">取得攝影機影像</button>
    <button @click="setStream('display')">取得螢幕影像</button>
    <br>
    <button @click="handleRecord">{{ isRecording ? '結束錄製' : '開始錄製' }}</button>
    <br>
  </div>
</template>
