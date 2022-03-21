

const targetMap = new Map()
function getSubscribersForProperty(target, key) {
    if (!targetMap.get(target)) {
        targetMap.set(target, new Map())
    }
    if (!targetMap.get(target).get(key)) {
        targetMap.get(target).set(key, new Set())
    }
    console.dir(target)
    return targetMap.get(target).get(key)
}

let curEffect
export function watchEffect(fn) {
    curEffect = fn
    // Only execute when there is an activeEffect
    if (curEffect) curEffect()
    curEffect = null
}

function track(target, key) {
    if (curEffect) {
        console.log('🔎 track', key)
        const effects = getSubscribersForProperty(target, key)
        effects.add(curEffect)
    }
}

function trigger(target, key) {
    console.log('💥 trigger',target, key)
    const effects = getSubscribersForProperty(target, key)
    effects.forEach(e => e())
}

export function reactive(object) {
    return new Proxy(object, {
        get(target, key, receiver) {
            console.log('get', key, 'from', target)
            const result = Reflect.get(target, key, receiver)
            track(target, key) //track changes for the key in the target
            return result
        },
        set(target, key, value, receiver) {
            console.log('set', key, '=>', value)
            const result = Reflect.set(target, key, value, receiver)
            trigger(target, key) // trigger a change in the target
            return result
        },
    })
}

export function ref(value) {
    let refObject  = {
        get value() {
            track(refObject, 'value')
            return value
        },
        set value(newValue) {
            value = newValue
            trigger(refObject, 'value')
        },
    }
    return refObject 
}
export function computed(handler) {
    let result = ref()
    watchEffect(() => {
        result.value = handler()
    })
    return result
}