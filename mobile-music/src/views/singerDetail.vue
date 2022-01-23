<template>
	<div class="singer-detail">
		<music-list
			:songs="songs"
			:pic="pic"
			:title="title"
			:loading="loading"
		></music-list>
	</div>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, toRefs, ref } from "vue";
import { getSingerDetail } from "@/server/singer";
import { processSongs } from "@/server/song";
import MusicList from "@/components/base/musicList/musicList";

export default defineComponent({
	name: "SingerDetail",
	components: {
		MusicList,
	},
	props: {
		singer: Object,
	},
	setup(props) {
    const loading = ref(true);
		const state = reactive({
			songs: [], // 歌手歌曲
		});

		const pic = computed(() => {
			return props.singer && props.singer.pic;
		});
		const title = computed(() => {
			return props.singer && props.singer.name;
		});

		onMounted(async () => {
			// 歌手详情
			const result = await getSingerDetail(props.singer);
			state.songs = await processSongs(result.songs);
      loading.value = false;
		});

		return {
			...toRefs(state),
			pic,
			title,
      loading,
		};
	},
});
</script>

<style lang="scss" scoped>
.singer-detail {
	position: fixed;
	z-index: 10;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: $color-background;
}
</style>
