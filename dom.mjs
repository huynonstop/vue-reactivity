import { reactive, computed, watchEffect } from './reactivity.mjs'
const product = reactive({ price: 15, quantity: 2 })
let total = computed(() => product.price * product.quantity)


watchEffect(() => {
  document.getElementById('quantity').innerText = product.quantity
})
watchEffect(() => {
  document.getElementById('price').innerText = product.price
})
watchEffect(() => {
  document.getElementById('total').innerText = total.value
})
const updateProduct = (val) => {
  console.log('clicked')
  product.quantity += val
}
window.updateProduct = updateProduct