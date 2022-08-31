
const frameRate = 30
let frame = 0
let context
let forceStop = false
let filterStr = ''

function renderFrame(sourceVideo, filters, callBack) {
  frame++
  sourceVideo.currentTime = frame / frameRate
  const time = Math.floor(frame / frameRate)

  filters.forEach(filter => {
    if (filter.filterName !== 'flip' && time == filter.starttime && !filterStr.includes(filter.filterName)) {
      filterStr.includes('none') ? filterStr = filter.filterName : filterStr += ` ${filter.filterName}`
    }
    if (filter.filterName !== 'flip' && time == filter.endtime && filterStr.includes(filter.filterName)) {
      filterStr = filterStr.replace(`${filter.filterName}`, '').trim() || 'none'
    }
    if (time == filter.starttime && filter.filterName === 'flip') {
      context.setTransform(1, 0, 0, 1, 0, 0)
      context.translate(480, 0)
      context.scale(-1, 1)
    }
    if (time == filter.endtime && filter.filterName === 'flip') {
      context.setTransform(1, 0, 0, 1, 0, 0)
      context.translate(0, 0)
      context.scale(1, 1)
    }
  })
  context.filter = filterStr
  if (time >= sourceVideo.duration || forceStop) return stopVideo(callBack)

  context.drawImage(sourceVideo, 0, 0, 480, 360)

  setTimeout(() => {
    renderFrame(sourceVideo, filters, callBack)
  }, 33) // 1000/30fps = 33
}

export const playVideo = function (canvas, sourceVideo, filters, callBack) {
  frame = 0
  filterStr = ''
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
