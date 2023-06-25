const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8000 });

server.on("connection", handleConnection);

function handleConnection(ws) {
  console.log("---Server is connected");

  ws.on("close", handleClose);
  ws.on("error", handleError);
  ws.on("message", handleMessage);
}

function handleClose() {
  console.log("---Server is closed---");

  this.send(JSON.stringify({
    mode: "MESSAGE",
    msg: "---Server is closed---",
  }))
}

function handleError(error) {
  console.log("---Server occurred error---", error);
}

function handleMessage(data) {
  const { mode, msg } = JSON.parse(data);

  switch (mode) {
    case "MESSAGE":
      console.log("---MESSAGE---");
      this.send(JSON.stringify({
        mode: "MESSAGE",
        msg,
      }));
      break;
    case "HEART_BEAT":
      console.log("---HEART_BEAT---");
      this.send(JSON.stringify({
        mode: "HEART_BEAT",
        msg,
      }));
      break;
    default:
      break;
  }
}