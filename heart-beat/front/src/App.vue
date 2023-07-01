<template>
	<button @click="handleSend">Send</button>
</template>

<script setup>
import Ws from "./webSocket";

let ws = null;

const wsConnect = () => {
	ws = Ws.create("ws://127.0.0.1:8000");
};

const wsReConnect = () => {
	if (!ws) {
		return wsConnect();
	}
	// if(ws && ws.)
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
