<template>
	<button @click="handleSend">Send</button>
</template>

<script setup>
import Ws from "./webSocket";

let ws = null;

const handleInit = async () => {
	ws = await Ws.create("ws://127.0.0.1:8000");
};

const handleSend = () => {
	if (ws) {
		ws.sendMsg({
			mode: "MESSAGE",
			msg: "Hello",
		});
	}
};

handleInit();
</script>

<style scoped></style>
