import { RecordRTCPromisesHandler } from "recordrtc"
import { ref } from 'vue'

let recorder

export const startRecord = async function (mediaStream) {
  if (!mediaStream) return
  recorder = new RecordRTCPromisesHandler(mediaStream, {
    type: 'video',
    disableLogs: true,
  })
  await recorder.startRecording()
}

export const stopRecord = async function (callBack) {
  await recorder.stopRecording()
  const resultBlob = await recorder.getBlob()
  recorder = null
  callBack(resultBlob)
}


export default function useRecord() {
  const blob = ref({})
  const setBlob = (value) => {
    blob.value = value
  }
  return { blob, setBlob }
}