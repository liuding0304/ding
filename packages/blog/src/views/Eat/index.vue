<template>
  <div class="eat">
    <h1>
      吃啥？
      <br />
      <br />
      <b style="color: #ff9733">{{ food && food.name }}</b>
    </h1>
    <input v-if="showBtn" type="button" :value="btnValue" @click="begin" />
  </div>
</template>

<script>
  import { ref, defineComponent } from 'vue'
  import Foods from './foods'

  const MAX_TIME = 6
  const BTN_VALUE = {
    start: '开始',
    stop: '停止',
    next: '不行，换一个',
  }
  const RUN_TYPE = {
    runing: 0,
    stop: 1,
  }
  export default defineComponent({
    setup() {
      let runTimes = 0
      let run = RUN_TYPE.stop
      let food = ref({})
      let showBtn = ref(true)
      let btnValue = ref(BTN_VALUE.start)
      let timer

      const showAmimation = () => {
        var rTop = Math.ceil(Math.random() * $(document).height()),
          rLeft = Math.ceil(Math.random() * ($(document).width() - 50)),
          rSize = Math.ceil(Math.random() * (37 - 14) + 14)
        $('<span class="temp"></span>')
          .html(food.value.name)
          .hide()
          .css({
            top: rTop,
            left: rLeft,
            color: 'rgba(0,0,0,.' + Math.random() + ')',
            fontSize: rSize + 'px',
          })
          .appendTo('.eat')
          .fadeIn('slow', function () {
            $(this).fadeOut('slow', function () {
              $(this).remove()
            })
          })
      }

      const begin = () => {
        if (run === RUN_TYPE.runing) {
          run = RUN_TYPE.stop
          btnValue.value = BTN_VALUE.next
          clearInterval(timer)
        } else {
          if (runTimes > MAX_TIME) {
            showBtn.value = false
            alert('这么作？今天别吃了！')
            return
          }
          runTimes++
          run = RUN_TYPE.runing
          btnValue.value = BTN_VALUE.stop
          timer = setInterval(function () {
            const r = Math.ceil(Math.random() * Foods.length)
            food.value = Foods[r - 1]
            showAmimation()
          }, 50)
        }
      }
      return {
        food,
        btnValue,
        begin,
        showBtn,
      }
    },
  })
</script>
<style lang="scss">
  .eat {
    height: 100%;
    width: 100%;
    text-align: center;
    padding-top: 15%;
    box-sizing: border-box;

    h1 {
      margin: 0 0 20px;
      padding: 0;
      font-size: 30px;
      b {
        font-weight: 700;
      }
    }

    input {
      width: 120px;
      height: 40px;
      vertical-align: middle;
      font-family: '微软雅黑';
      cursor: pointer;
    }
    .temp {
      position: absolute;
      z-index: -1;
      color: #777;
    }
  }
</style>
