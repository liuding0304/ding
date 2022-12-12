import Event from "utils/src/event";

// 棋子类型
const CHESS_TYPE = {
  white: 'white',
  black: 'black'
}

function getInverseType(type) {
  return type === CHESS_TYPE.white ? CHESS_TYPE.black : CHESS_TYPE.white
}

// 棋盘
class Board extends Event {
  constructor({ el, size = 15, gap = 30 }) {
    super()
    this.el = el // canvas节点
    this.context = el.getContext('2d');
    this.size = size // 棋盘尺寸
    this.gap = gap // 棋盘方格大小
    this.drawBoard();
    this.onclick();
  }
  drawBoard() {
    const { gap, size, context } = this
    context.strokeStyle = "#BFBFBF";
    const boardWidth = gap * size;
    const startX = gap / 2
    const startY = gap / 2
    const endX = boardWidth - gap / 2
    const endY = boardWidth - gap / 2

    for (let i = 0; i < size; i++) {
      context.moveTo(startX + i * gap, startY);
      context.lineTo(startX + i * gap, endY);
      context.stroke();
      context.moveTo(startX, startY + i * gap);
      context.lineTo(endX, startY + i * gap);
      context.stroke();
    }
  }
  drawChess(i, j, type) {
    const { context } = this
    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
    context.closePath();
    let gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
    if (type === CHESS_TYPE.black) {
      gradient.addColorStop(0, "#0A0A0A");
      gradient.addColorStop(1, "#636766");
    } else {
      gradient.addColorStop(0, "#D1D1D1");
      gradient.addColorStop(1, "#F9F9F9");
    }

    context.fillStyle = gradient;
    context.fill();

  }
  reset() {
    context.clearRect(0, 0, this.el.width, this.el.height);
    this.drawBoard();
  }
  onclick() {
    this.el.onclick = (e) => {
      let x = e.offsetX;
      let y = e.offsetY;
      this.emit('click',  Math.floor(x / 30), Math.floor(y / 30))
    }
  }
}

// 棋手
class Chesser {
  constructor({ type, gobang }) {
    this.type = type;
    this.gobang = gobang;
  }

  play() {}
  // 下子
  setChess(x, y) {
    this.gobang.play(x, y, this.type)
  }
}

// 机器人
class Computer extends Chesser {
  play() {
    const {x, y } = this.computerUser()
    this.gobang.play(x, y, this.type)
  }
  computerUser() {
    const { gobang } = this
    const { size } = gobang

    const selfWin =  gobang.win[this.type]
    const inverseWin =  gobang.win[getInverseType(this.type)]

    let max = 0; // 保存最高的分数
    let x, y; //保存最高分点的坐标
    let selfMaxScore = 0
    let inverseMaxScore = 0
    const selfScoreMap = {
      1: 200,
      2: 400,
      3: 2000,
      4: 10000,
      0: 0,
    }
    const inverseScoreMap = {
      1: 220,
      2: 420,
      3: 2100,
      4: 20000,
      0: 0,
    }

    // 遍历棋盘所有空
    gobang.chessBoard.forEach((row, i) => {
      row.forEach((chess, j) => {
        if (!chess) {
          let inverseScore = 0
          let selfScore = 0
          gobang.wins[i][j].forEach((isWin,k) => {
            if (isWin) {
              inverseScore += selfScoreMap[selfWin[k]]
              selfScore += inverseScoreMap[inverseWin[k]]
            }
          });

          if (inverseScore > max) {
            max = inverseScore;
            selfMaxScore = selfScore
            inverseMaxScore = inverseScore
            x = i;
            y = j;
          } else if (inverseScore == max && selfScore > selfMaxScore) {
            selfMaxScore = selfScore
            inverseMaxScore = inverseScore
            x = i;
            y = j;
          }

          if (selfScore > max) {
            max = selfScore;
            selfMaxScore = selfScore
            inverseMaxScore = inverseScore
            x = i;
            y = j;
          } else if (selfScore == max && inverseScore > inverseMaxScore) {
            selfMaxScore = selfScore
            inverseMaxScore = inverseScore
            x = i;
            y = j;
          }
        }
      })
    })

    return { x, y}
  }
}

// 用户
class People extends Chesser {
  play() {
    this.gobang.once('click', (x, y) => {
      this.gobang.play(x, y, this.type)
    })
  }
}


// 五子棋
class Gobang extends Event {
  constructor({ size = 15, gap = 30 } = {}) {
    super()
    this.size = size;
    this.board = new Board({ el: document.getElementById("chess"), size, gap })

    // 初始化所有赢面
    this.wins = []
    this.winCount = 0
    this.getWins()

    this.curType = CHESS_TYPE.white

    this.board.on('click', (x, y) => {
      // 检查该位置是否可以下
      if (this.chessBoard && !this.chessBoard[x][y]) {
        this.emit('click', x, y)
      }
    })
  }

  // 获取所有赢的状态
  getWins() {
    const { size } = this
    let wins = []
    let count = 0

    for (let i = 0; i < size; i++) {
      wins[i] = [];
      for (let j = 0; j < size; j++) {
        wins[i][j] = [];
      }
    }


    // 初始化所有的横线
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < (size - 4); j++) {
        // 第0种赢法
        //wins[0][0][0] = true
        //wins[0][1][0] = true
        //wins[0][2][0] = true
        //wins[0][3][0] = true
        //wins[0][4][0] = true
        // 第1种赢法
        //wins[0][1][1] = true
        //wins[0][2][1] = true
        //wins[0][3][1] = true
        //wins[0][4][1] = true
        //wins[0][5][1] = true
        for (let k = 0; k < 5; k++) {
          wins[i][j + k][count] = true;
        }
        count++;
      }
    }

    // 统计所有的竖线
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < (size - 4); j++) {
        for (let k = 0; k < 5; k++) {
          wins[j + k][i][count] = true;
        }
        count++;
      }
    }

    // 统计所有的斜线
    for (let i = 0; i < (size - 4); i++) {
      for (let j = 0; j < (size - 4); j++) {
        for (let k = 0; k < 5; k++) {
          wins[i + k][j + k][count] = true;
        }
        count++;
      }
    }

    // 统计所有的反斜线
    for (let i = 0; i < (size - 4); i++) {
      for (let j = size - 1; j > 3; j--) {
        for (let k = 0; k < 5; k++) {
          wins[i + k][j - k][count] = true;
        }
        count++;
      }
    }

    console.log("count:" + count);
    this.winCount = count;
    this.wins = wins;
  }


  start() {
    this.winner = ''
    // 初始化棋盘上所有棋子状态
    this.chessBoard = new Array(this.size).fill([]).map(i => new Array(this.size).fill(0));

    // 初始化黑白棋的赢面
    this.win = {
      [CHESS_TYPE.white]: new Array(this.winCount).fill(0),
      [CHESS_TYPE.black]: new Array(this.winCount).fill(0)
    }

    this.emit('step', this.curType)
  }


  play(x, y, type) {
    if (this.over) {
      console.log('已结束，请重新开始')
      return
    }
    // 1. 下棋到 x, y
    this.board.drawChess(x, y, type)
    this.chessBoard[x][y] = type;
    // 2. 判断是否结束
    const isWin = this.setWin(x, y, type)
    if (isWin) {
      this.winner = type
      this.over = true;

      this.emit('over', type)
      setTimeout(() => {
        window.alert(`${type}方赢了`)
      }, 100);
    } else {
      // 3. 未结束， 切换棋子
      this.curType = getInverseType(type)

      // 4. 执棋者下棋
      this.emit('step', this.curType)
    }
  }

  setWin(x, y, type) {
    let isWin = false
    for (let k = 0; k < this.winCount; k++) {
      if (this.wins[x][y][k]) {
        this.win[type][k]++;
        const inverseType = getInverseType(type)
        this.win[inverseType][k] = 6;
        if (this.win[type][k] == 5) {
          isWin = true
        }
      }
    }

    return isWin;
  }
}

const gobang = new Gobang()

const people = new People({
  type: CHESS_TYPE.white,
  gobang,
})
const computer = new Computer({
  type: CHESS_TYPE.black,
  gobang,
})

gobang.on('step', (type) => {
  if (people.type === type) {
    people.play()
  } else {
    computer.play()
  }
})
gobang.start()