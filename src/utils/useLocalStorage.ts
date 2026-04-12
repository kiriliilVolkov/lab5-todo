import { watch, ref } from 'vue'

export default function useLocalStorage(key: string) {
  const items = ref(JSON.parse(localStorage.getItem(key)) || [])

  const addItem = (item) => {
    items.value.push(item)
  }

  watch(
    items,
    (newItems) => {
      localStorage.setItem(key, JSON.stringify(newItems))
    },
    { deep: true },
  )

  return {
    items,
    addItem,
  }
}
