<template>
	<button @click="handleSend">Send</button>
</template>

<script setup>
import Ws from "./webSocket";

let ws = null;

const wsConnect = () => {
	ws = Ws.create("ws://127.0.0.1:8000", wsReConnect);
};

// 重连
const wsReConnect = () => {
	if (!ws) {
		return wsConnect();
	}

	if (ws && ws.reconnectingTimer) {
		clearTimeout(ws.reconnectingTimer);
		ws.reconnectingTimer = null;
		wsConnect();
	}
};

const handleSend = () => {
	if (ws) {
		ws.sendMsg({
			mode: "MESSAGE",
			msg: "Hello",
		});
	}
};

wsConnect();
</script>

<style scoped></style>
