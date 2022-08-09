
const frameRate = 30
let frame = 0
let context
let forceStop = false

function renderFrame(sourceVideo, filters, callBack) {
  frame++
  sourceVideo.currentTime = frame / frameRate
  const time = Math.floor(frame / frameRate)

  filters.forEach(filter => {
    if (time == filter.starttime)
      context.filter = filter.filterName
    if (time == filter.endtime)
      context.filter = 'none'
  })
  if (time >= sourceVideo.duration || forceStop) return stopVideo(callBack)

  context.drawImage(sourceVideo, 0, 0, 480, 360)

  setTimeout(() => {
    renderFrame(sourceVideo, filters, callBack)
  }, 33) // 1000/30fps = 33
}

export const playVideo = function (canvas, sourceVideo, filters, callBack) {
  frame = 0
  forceStop = false
  canvas.width = 480
  canvas.height = 360
  context = canvas.getContext('2d')
  renderFrame(sourceVideo, filters, callBack)
  if (callBack)
    return callBack(true)
}

export const stopVideo = function (callBack) {
  frame = 0
  forceStop = true
  if (callBack)
    return callBack(false)
}
