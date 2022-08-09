import { reactive } from 'vue'


export default function useFilters() {
  const newFilter = reactive({
    starttime: 0,
    endtime: 0,
    filterName: '',
  })

  const filters = reactive([])
  const removeFilter = function (id) {
    const target = filters.findIndex((element) => element.id === id)
    filters.splice(target, 1)
  }
  const setFilters = function () {
    newFilter.id = filters.length + 1
    filters.push(Object.assign({}, newFilter))
    filters.sort((a, b) => {
      return Number(a.starttime) - Number(b.starttime)
    })
  }
  return {
    newFilter, removeFilter, filters, setFilters
  }
}