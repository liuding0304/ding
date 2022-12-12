// 棋盘
class ChessBoard {
  constructor({ el, size = 15, gap = 30 }) {
    this.el = el // canvas节点
    this.context = el.getContext('2d');
    this.size = size // 棋盘尺寸
    this.gap = gap // 棋盘方格大小
    this.over = false
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
  drawChess(i, j, black) {
    const { context } = this
    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
    context.closePath();
    let gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
    if (black) {
      gradient.addColorStop(0, "#0A0A0A");
      gradient.addColorStop(1, "#636766");
    } else {
      gradient.addColorStop(0, "#D1D1D1");
      gradient.addColorStop(1, "#F9F9F9");
    }

    context.fillStyle = gradient;
    context.fill();

  }
  stop() {
    this.over = true;
  }
  clear() {
    context.clearRect(0, 0, this.el.width, this.el.height);
  }
  reset() {
    this.clear();
    this.drawBoard();
  }
  onclick() {
    this.el.onclick = (e) => {
      if (this.over) return;
      let x = e.offsetX;
      let y = e.offsetY;
      let i = Math.floor(x / 30);
      let j = Math.floor(y / 30);
      this.onStep && this.onStep(i , j)
    }

  }
}

//
class Chesser() {

}


// 机器人
class Computer {
  constructor() {

  }

}

// 用户
class People {
  constructor () {

  }
}



class Gobang {
  constructor({ size = 15, gap = 30 } = {}) {
    this.size = size;
    this.chess = new ChessBoard({
      el: document.getElementById("chess"),
      size,
      gap,
    })
    this.wins = []
    this.winCount = 0
    this.getWins()
  }

  start() {
    this.over = false;
    this.getChessBoard()
    this.man = {
      name: '用户',
      win: [],
      black: false,
    }

    this.computer = {
      name: '电脑',
      win: [],
      black: true,
    }

    this.chess.onStep = (x, y) => {
      this.step(x, y, this.man);
      if (!this.over) {
        const { x: cx,  y: xy } = this.computerUser()
        this.step(cx, xy, this.computer);
      }

      if (this.over) {
        this.chess.stop()
      }
    }
  }

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

  getChessBoard() {
    this.chessBoard = [] // 棋盘落子
    for (let i = 0; i < 15; i++) {
      this.chessBoard[i] = [];
      for (let j = 0; j < 15; j++) {
        this.chessBoard[i][j] = 0;
      }
    }
  }

  step(x, y, user) {
    const otherUser = user === this.computer ? this.man : this.computer

    this.chess.drawChess(x, y, user.black)
    this.chessBoard[x][y] = user.black ? 1 : 2;

    for (let k = 0; k < this.winCount; k++) {
      if (this.wins[x][y][k]) {
        user.win[k]++;
        otherUser.win[k] = 6;
        if (user[k] == 5) {
          this.gameOver(user)
        }
      }
    }
  }

  gameOver(winUser) {
    this.winUser = winUser
    this.over = true;
    console.log(`${winUser.name}赢了`)
  }

  computerUser() {
    let myScore = [];
    let computerScore = [];
    let max = 0; // 保存最高的分数
    let u = 0, v = 0; //保存最高分点的坐标
    for (let i = 0; i < 15; i++) {
      myScore[i] = [];
      computerScore[i] = [];
      for (let j = 0; j < 15; j++) {
        myScore[i][j] = 0;
        computerScore[i][j] = 0;
      }
    }

    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        if (this.chessBoard[i][j] == 0) {
          for (let k = 0; k < this.winCount; k++) {
            if (this.wins[i][j][k]) {
              if (this.man.win[k] == 1) {
                myScore[i][j] += 200;
              }
              else if (this.man.win[k] == 2) {
                myScore[i][j] += 400;
              }
              else if (this.man.win[k] == 3) {
                myScore[i][j] += 2000;
              }
              else if (this.man.win[k] == 4) {
                myScore[i][j] += 10000;
              }

              if (this.computer.win[k] == 1) {
                computerScore[i][j] += 220;
              }
              else if (this.computer.win[k] == 2) {
                computerScore[i][j] += 420;
              }
              else if (this.computer.win[k] == 3) {
                computerScore[i][j] += 2100
              }
              else if (this.computer.win[k] == 4) {
                computerScore[i][j] += 20000;
              }
            }
          }
          if (myScore[i][j] > max) {
            max = myScore[i][j];
            u = i;
            v = j;
          }
          else if (myScore[i][j] == max) {
            if (computerScore[i][j] > computerScore[u][v]) {
              u = i;
              v = j;
            }
          }

          if (computerScore[i][j] > max) {
            max = computerScore[i][j];
            u = i;
            v = j;
          }
          else if (computerScore[i][j] == max) {
            if (myScore[i][j] > myScore[u][v]) {
              u = i;
              v = j;
            }
          }
        }
      }
    }

    return { x: u, y: v}
  }
}

const gobang = new Gobang()
gobang.start();