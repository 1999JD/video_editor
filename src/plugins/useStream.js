import { ref } from 'vue'

const getUserMedia = (constraints) => {
  return new Promise((resolve, reject) => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          resolve(stream)
        })
        .catch((error) => {
          reject(error)
        })
    } else if (navigator.getUserMedia) {
      navigator.getUserMedia(
        constraints,
        (stream) => {
          resolve(stream)
        },
        (error) => {
          reject(error)
        }
      )
    } else {
      reject(new Error('Your browser does not support WebRTC'))
    }
  })
}
const getDisplayMedia = (constraints) => {
  return new Promise((resolve, reject) => {
    if (navigator.getDisplayMedia) {
      navigator
        .getDisplayMedia(constraints)
        .then((stream) => {
          resolve(stream)
        })
        .catch((e) => {
          reject(e)
        })
    } else if (navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices
        .getDisplayMedia(constraints)
        .then((stream) => {
          resolve(stream)
        })
        .catch((e) => {
          reject(e)
        })
    } else {
      constraints = { video: { mediaSource: 'screen' } }
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          resolve(stream)
        })
        .catch((e) => {
          reject(e)
        })
    }
  })
}

export default function useStream() {
  const stream = ref(null)
  const setStream = async (methods, constraints) => {
    constraints = constraints || { video: true, audio: false }
    if (methods === 'user') stream.value = await getUserMedia(constraints)
    else if (methods === 'display') stream.value = await getDisplayMedia(constraints)
  }
  return {
    stream, setStream
  }
}