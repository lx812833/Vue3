const WS_MODE = {
  MESSAGE: "MESSAGE",
  HEART_BEAT: "HEART_BEAT",
}

class Ws extends WebSocket {
  constructor(url, wsReConnect) {
    super(url);
    this.wsUrl = url;
    this.heartBeatTimer = null; // 心跳定时器
    this.reconnectingTimer = null; // 重连定时器
    this.wsReConnect = wsReConnect; // 断开重连方法

    this.init();
  }

  static create(url, wsReConnect) {
    return new Ws(url, wsReConnect);
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
    this.startHeartBeat();
  }

  handleClose() {
    console.log("---Client is closed---");

    if (this.heartBeatTimer) {
      clearInterval(this.heartBeatTimer);
      this.heartBeatTimer = null;
    }

    if (this.reconnectingTimer) {
      clearTimeout(this.reconnectingTimer);
      this.reconnectingTimer = null;
    }

    this.reconnect();
  }

  handleError(e) {
    console.log("---Client occured error---", e);
    this.reconnect();
  }

  handleMessage(data) {
    const { mode, msg } = this.receiveMsg(data);

    switch (mode) {
      case WS_MODE.HEART_BEAT:
        console.log("---HEART_BEAT---", msg);
        break;
      case WS_MODE.MESSAGE:
        console.log("---MESSAGE---", msg);
        break;
      default:
        break;
    }
  }

  // 开启心跳连接
  startHeartBeat() {
    this.heartBeatTimer = setInterval(() => {
      if (this.readyState === 1) {
        this.sendMsg({
          mode: WS_MODE.HEART_BEAT,
          msg: "HEART_BEAT"
        });
      } else {
        clearInterval(this.heartBeatTimer);
        this.heartBeatTimer = null;
      }

      // 模拟websocket断开重连
      this.waitForResponse();
    }, 4000);
  }

  // 重连
  reconnect() {
    this.reconnectingTimer = setTimeout(() => {
      this.wsReConnect();
    }, 3000);
  }

  // 模拟关闭服务
  waitForResponse() {
    setTimeout(() => {
      this.close();
    }, 2000);
  }

  receiveMsg({ data }) {
    return JSON.parse(data);
  }

  sendMsg(data) {
    this.readyState === 1 && this.send(JSON.stringify(data));
  }
}

export default Ws;