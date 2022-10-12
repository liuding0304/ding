/**
 * 计算文本在页面中需要占据的宽度
 */
const textSize = (() => {
  const span = document.createElement('span')
  const { offsetWidth: defaultOffsetWidth } = span // 内容为空时的默认宽度
  span.style.visibility = 'hidden'
  span.style.position = 'absolute'
  span.style.top = '-100px'
  span.style.fontSize = '12px'
  document.body.appendChild(span)

  return (text, fontSize = '12px') => {
    span.style.fontSize = fontSize
    if (typeof span.textContent !== 'undefined') {
      span.textContent = text
    } else span.innerText = text
    return span.offsetWidth - defaultOffsetWidth
  }
})()

export default textSize
