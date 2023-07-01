const WS_MODE = {
  MESSAGE: "MESSAGE",
  HEART_BEAT: "HEART_BEAT",
}

class Ws extends WebSocket {
  constructor(url) {
    super(url);
    this.wsUrl = url;
    this.connectedStatus = false; // 连接状态
    this.heartBeatTimer = null;
    this.heartBeatTimer = null;
    this.init();
  }

  static create(url) {
    return new Ws(url);
  }

  init() {
    this.bindEvent();
  }

  bindEvent() {
    this.addEventListener("open", this.handleOpen, false);
    this.addEventListener("close", this.handleClose, false);
    this.addEventListener("error", this.handleError, false);
    this.addEventListener("message", this.handleMessage, false);
  }

  handleOpen() {
    console.log("---Client is connected---");

    this.connectedStatus = true;
    this.startHeartBeat();
  }

  handleClose() {
    console.log("---Client is closed---");

    this.connectedStatus = false;
    if (this.heartBeatTimer) {
      clearInterval(this.heartBeatTimer);
      this.heartBeatTimer = null;
    }
    if (this.heartBeatTimer) {
      clearTimeout(this.heartBeatTimer);
      this.heartBeatTimer = null;
    }
    this.reconnect();
  }

  handleError(e) {
    console.log("---Client error---", e);

    this.connectedStatus = false;
    this.reconnect();
  }

  handleMessage(data) {
    const { mode, msg } = this.receiveMsg(data);
    switch (mode) {
      case WS_MODE.MESSAGE:
        console.log("--- 客户端MESSAGE ---", msg);
        break;
      case WS_MODE.HEART_BEAT:
        this.connectedStatus = true;
        console.log("--- 客户端HEART_BEAT ---", msg);
        break;
      default:
        break;
    }
  }

  receiveMsg({ data }) {
    return JSON.parse(data);
  }

  sendMsg(data) {
    return this.send(JSON.stringify(data));
  }

  // 开启心跳连接
  startHeartBeat() {
    this.heartBeatTimer = setInterval(() => {
      if (this.heartBeatTimer) {
        this.sendMsg({
          mode: WS_MODE.HEART_BEAT,
          msg: "WS_MODE.HEART_BEAT"
        })
      } else {
        clearInterval(this.heartBeatTimer);
        this.heartBeatTimer = null;
      }

      this.waitForResponse();
    }, 14000);
  }

  // 重连
  reconnect() {
    console.log("--- 客户端重连 ---");
    return new Promise(resolve => {
      this.heartBeatTimer = setTimeout(() => {
        resolve(Ws.create(this.wsUrl));
      }, 14000);
    })
  }

  // 模拟关闭服务
  waitForResponse() {
    this.connectedStatus = false;

    setTimeout(() => {
      this.close();
    }, 2000);
  }
}

export default Ws;