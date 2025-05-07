// Updates can be partially applied, to make referencing the function easier.
const curry = (n, f, ...args) => {
  if (n <= 0) {
    return f(...args)
  }

  return (...rest) => {
    return curry(n - rest.length, f, ...args, ...rest)
  }
}

// Find safely looks for the data you want, returns undefined if not found
const find = ([key, ...keys], obj) => {
  if (!keys.length) {
    return obj[key]
  }

  if (obj[key] == null) {
    return undefined
  }

  return find(keys, obj[key])
}

// Store returns functions for listening, updating, and viewing the state.
const store = modules => {
  const event = []
  const types = Object.keys(modules)

  const state = types.reduce((acc, type) => {
    return Object.assign(acc, {
      [type]: modules[type].state()
    })
  }, {})

  const update = types.reduce((acc, type) => {
    return Object.assign(acc, {
      [type]: modules[type].update
    })
  }, {})

  const subscribe = f => {
    return event.push(f)
  }

  return {
    subscribe,
    state: type => {
      const keys = type.split('/')

      return find(keys, state)
    },
    update: curry(2, (type, payload) => {
      const [key, ...keys] = type.split('/')
      const diff = find(keys, update[key])(payload)(state[key])

      event.forEach(f => {
        return f({ type, payload }, state[key], diff)
      })

      return Object.assign(state[key], diff)
    })
  }
}

module.exports = store
