import {reactive, watchEffect} from './reactivity.mjs'

const product = reactive({ price: 15, quantity: 2 })
let total = 0
watchEffect(() => {
    total = product.price * product.quantity
})

console.log(total)
product.price = 25
console.log(total)
product.quantity = 5
console.log(total)