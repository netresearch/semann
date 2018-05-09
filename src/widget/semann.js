const elementConnections = []
function getConnection (element) {
  let connection = elementConnections.find(i => i.element === element)
  if (!connection) {
    connection = {
      element,
      api: undefined,
      callbacks: []
    }
    elementConnections.push(connection)
  }
  return connection
}

export function connect (element, vm) {
  const connection = getConnection(element)
  connection.api = new Semann(vm)
  connection.callbacks.forEach(callback => callback(connection.api))
}

export class Semann {
  static adapter = {}

  constructor (vm) {
    this.configure = (...args) => vm.configure(...args)
    this.analyze = (...args) => vm.analyze(...args)
  }

  static connect (element, callback) {
    if (typeof element === 'string') {
      const el = document.getElementById(element)
      if (!el) {
        throw new Error('Can not find element with ID ' + element)
      }
      element = el
    }
    if (element.tagName.toLowerCase() !== 'semann-widget') {
      throw new Error('Given element is not a semann widget')
    }
    const connection = getConnection(element)
    if (connection.callbacks.indexOf(callback) < 0) {
      connection.callbacks.push(callback)
    }
    if (connection.api) {
      callback(connection.api)
    }
  }

  static configure (element, config) {
    this.connect(element, (api) => api.configure(config))
  }
}
