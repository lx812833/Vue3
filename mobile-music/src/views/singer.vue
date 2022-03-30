<template>
	<div class="singer" v-loading="!singers.length">
		<index-list :data="singers" @select="getSelectSinger"></index-list>
		<router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :singer="selectedSinger" />
      </transition>
    </router-view>
	</div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { getSingerList } from "@/server/singer";
import IndexList from "@/components/base/indexList/indexList";
import { SINGER_KEY } from "@/assets/js/constant";

export default defineComponent({
	name: "Singer",
	components: {
		IndexList,
	},
	setup() {
		// 路由实例
		const router = useRouter();
		let state = reactive({
			singers: [],
			selectedSinger: {}
		});

		onMounted(() => {
			getSingerList().then((res) => {
				state.singers = res.singers;
			});
		});
		// 获取点击的歌手信息
		const getSelectSinger = (val) => {
			state.selectedSinger = val;
			sessionStorage.setItem(SINGER_KEY, JSON.stringify(val));
			router.push({
				path: `/singer/${val.mid}`
			})
		}

		return {
			...toRefs(state),
			getSelectSinger
		};
	},
});
</script>

<style lang="scss" scoped>
.singer {
	position: fixed;
	width: 100%;
	top: 88px;
	bottom: 0;
}
</style>
