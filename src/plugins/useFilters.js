import { reactive } from 'vue'


export default function useFilters() {
  const newFilter = reactive({
    starttime: 0,
    endtime: 0,
    filterName: '',
  })

  const filters = reactive([])
  const setFilters = function () {
    filters.push(newFilter)
    filters.sort((a, b) => {
      return Number(a.starttime) - Number(b.starttime)
    })
  }
  return {
    newFilter, filters, setFilters
  }
}