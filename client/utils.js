export const updateItems = (arr, selector, update) => {
  return arr.map(item => selector(item) ? update(item) : item)
}
