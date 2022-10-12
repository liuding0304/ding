/**
 * [loadJsonp 加载jsonp数据]
 * @param  {[type]} url [url地址]
 * @param  {[type]} opt [配置参数]
 * @return {[type]}     [description]
 */
function loadJsonp(url, opt) {
  var option = {
    onLoad: null,
    onError: null,
    onTimeout: null,
    timeout: 8000,
    charset: 'utf-8',
  }
  var timer
  if (arguments.length == 1) {
    if (typeof arguments[0] == 'object') {
      opt = arguments[0]
      url = opt.url
    } else {
      opt = {}
    }
  }
  if (typeof opt.data == 'object') {
    var param = []
    for (var k in opt.data) {
      param.push(k + '=' + opt.data[k])
    }
    if (param.length > 0) {
      param = param.join('&')
      url += (url.indexOf('?') > 0 ? '&' : '?') + param
    }
  }
  for (var i in opt) {
    if (opt.hasOwnProperty(i)) {
      option[i] = opt[i]
    }
  }
  var el = document.createElement('script')
  el.charset = option.charset || 'utf-8'
  el.onload = el.onreadystatechange = function () {
    if (
      /loaded|complete/i.test(this.readyState) ||
      navigator.userAgent.toLowerCase().indexOf('msie') == -1
    ) {
      option.onLoad && option.onLoad()
      clear()
    }
  }
  el.onerror = function () {
    option.onError && option.onError()
    clear()
  }
  el.src = url
  document.getElementsByTagName('head')[0].appendChild(el)
  if (typeof option.onTimeout == 'function') {
    timer = setTimeout(function () {
      option.onTimeout()
    }, option.timeout)
  }
  var clear = function () {
    if (!el) {
      return
    }
    timer && clearTimeout(timer)
    el.onload = el.onreadystatechange = el.onerror = null
    el.parentNode && el.parentNode.removeChild(el)
    el = null
  }
}

export default loadJsonp
