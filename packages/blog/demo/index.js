const bucket = new WeakMap()

let activeEffect = null
const effectStack = []

function track(target, key) {
  if (!activeEffect) {
    return
  }
  let depsMap = bucket.get(target)
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }

  deps.add(activeEffect)
  activeEffect.deps.push(deps)
}

function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)
  const effectToRun = new Set()
  effects &&
    effects.forEach((fn) => {
      if (fn !== activeEffect) {
        effectToRun.add(fn)
      }
    })
  effectToRun.forEach((fn) => {
    if (fn.options.scheduler) {
      fn.options.scheduler(fn)
    } else {
      fn()
    }
  })
}

function effect(fn, options) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    effectStack.push(effectFn)
    const res = fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
    return res
  }
  effectFn.options = options
  effectFn.deps = []
  if (!options.lazy) {
    effectFn()
  }
  return effectFn
}

function cleanup(effectFn) {
  effectFn.deps.forEach((deps) => {
    deps.delete(effectFn)
  })
  effectFn.deps.length = 0
}

const jobQueue = new Set()

const p = Promise.resolve()

let isFlushing = false

function flushJob() {
  if (isFlushing) {
    return
  }
  isFlushing = true
  p.then(() => {
    jobQueue.forEach((job) => job())
  }).finally(() => {
    isFlushing = false
  })
}

function computed(fn) {
  let dirty = true
  let value
  const effectFn = effect(fn, {
    lazy: true,
    scheduler() {
      if (!dirty) {
        dirty = true
        trigger(obj, 'value')
      }
    },
  })
  const obj = {
    get value() {
      if (dirty) {
        value = effectFn()
        dirty = false
      }
      track(obj, 'value')
      return value
    },
  }
  return obj
}

const data = {
  text: 'hello wrold',
  name: 'ding',
}

const nameObj = computed(() => {
  return data.name
})

const obj = new Proxy(data, {
  get(target, key) {
    track(target, key)
    return target[key]
  },
  set(target, key, newVal) {
    target[key] = newVal
    trigger(target, key)
    return true
  },
})

function run() {
  document.body.innerText = obj.text
}

effect(run, {
  scheduler(effectFn) {
    jobQueue.add(effectFn)
    flushJob()
  },
})

setTimeout(() => {
  obj.text = 'hello Vue3'
  console.log(nameObj.value)
}, 3000)
