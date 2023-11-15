<template>
	<div class="app-container">
		<div class="app-header" @mousedown="handleSetDrag(true)" @mouseup="handleSetDrag(false)">
			<div class="header-col">
				<img class="header-logo" src="@/assets/images/header-logo.png" />
				<span class="header-title">傲雄DEMO管理系统</span>
			</div>
			<div class="header-col">
				<img class="header-avatar" src="@/assets/images/header-avatar.png" />
				<span class="header-person">张三</span>
				<img
					class="header-exit"
					src="@/assets/images/header-exit.png"
					@click="handleExit"
				/>
				<img
					class="header-close"
					src="@/assets/images/header-close.png"
					@click="handleClose"
				/>
			</div>
		</div>

		<div class="app-content">
			<router-view />
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const isElectron = ref(false);

const handleExit = () => {};

const handleClose = () => {
	if (window.electron && electron.ipcRenderer) {
		electron.ipcRenderer.send("window-close");
	}
};

const handleSetDrag = (tag) => {
	if (window.electron && electron.ipcRenderer) {
		electron.ipcRenderer.send("window-move-open", tag);
	}
};

onMounted(() => {
	if (window.electron && electron.ipcRenderer) {
		isElectron.value = true;
	}
});
</script>

<style lang="scss">
@import "@/assets/style/reset.scss";
body,
#app {
	width: 100vw;
	height: 100vh;
	background: #eff2f9;
}

.app-container {
	width: 100%;
	height: 100%;
	.app-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 56px;
		padding: 0 24px;
		background: linear-gradient(180deg, #ecf4fb 0%, #ffffff 100%);
		.header-col {
			display: flex;
			align-items: center;
			.header-logo {
				width: 109px;
				height: 24px;
				margin-right: 12px;
			}
			.header-avatar {
				width: 32px;
				height: 32px;
				margin-right: 8px;
			}
			.header-exit {
				width: 16px;
				height: 16px;
				margin-right: 16px;
				cursor: pointer;
			}
			.header-close {
				width: 22px;
				height: 22px;
				cursor: pointer;
			}
			.header-title {
				font-family: PingFang SC;
				font-size: 18px;
				font-weight: 500;
				line-height: 18px;
				color: rgba(34, 34, 34, 1);
			}
			.header-person {
				margin-right: 8px;
				font-family: PingFang SC;
				font-size: 14px;
				font-weight: 400;
				line-height: 14px;
				color: rgba(14, 22, 54, 1);
			}
		}
	}
	.app-content {
		height: calc(100% - 104px);
		margin: 24px;
		border-radius: 8px;
		background: rgba(255, 255, 255, 1);
	}
}

// 滚动条样式
.scrollbar::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}

.scrollbar::-webkit-scrollbar-track {
	border-radius: 4px;
	background-color: rgba(163, 163, 163, 0.89);
}

.scrollbar::-webkit-scrollbar-thumb {
	border-radius: 4px;
	width: 6px;
	background-color: rgba(126, 125, 125, 0.7);
}

.scrollbar::-webkit-scrollbar-button {
	border-style: solid;
	height: 0;
	width: 0;
}

.scrollbar::-webkit-scrollbar-button:vertical:decrement {
	border-width: 0 0 9px 0;
	border-color: transparent transparent rgba(163, 163, 163, 0.5) transparent;
}

.scrollbar::-webkit-scrollbar-button:vertical:increment {
	border-width: 9px 0 0 0;
	border-color: rgba(163, 163, 163, 0.5) transparent transparent transparent;
}
</style>
