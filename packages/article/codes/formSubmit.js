const trans = {
  string: 'text',
  number: 'number',
}

export default function formSubmit(options) {
  let { action, method, data, file } = options
  if (!action) {
    throw new Error('[action] options is required in options')
  }
  method = method || 'get'

  const form = document.createElement('form')
  form.setAttribute('action', action)
  form.setAttribute('method', method)
  form.style.display = 'none'

  const submit = document.createElement('input')
  submit.setAttribute('type', 'submit')

  if (Object.prototype.toString.call(data) === '[object Object]') {
    Object.keys(data).forEach((key) => {
      const val = data[key]
      const valType = typeof val
      const inputDom = document.createElement('input')
      inputDom.setAttribute('name', key)
      inputDom.setAttribute('value', val)
      inputDom.setAttribute('type', trans[valType])
      form.appendChild(inputDom)
    })
  }
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}
