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
import { useRoute } from "vue-router";
import { getSingerDetail } from "@/server/singer";
import { processSongs } from "@/server/song";
import MusicList from "@/components/musicList/musicList";
import { SINGER_KEY } from "../assets/js/constant";

export default defineComponent({
	name: "SingerDetail",
	components: {
		MusicList,
	},
	props: {
		singer: Object,
	},
	setup(props) {
		const route = useRoute();
    const loading = ref(true);
		const state = reactive({
			songs: [], // 歌手歌曲
		});

		// 通过缓存获取歌手详情
		const cacheSinger = computed(() => {
			let result = null;
			if(props.singer && props.singer.mid) {
				result = props.singer;
			} else {
				let cache = JSON.parse(sessionStorage.getItem(SINGER_KEY));
				if(cache && cache.mid === route.params.id) {
					result = cache;
				}
			}
			return result;
		})
		const pic = computed(() => {
			return cacheSinger.value && cacheSinger.value.pic;
		});
		const title = computed(() => {
			return cacheSinger.value && cacheSinger.value.name;
		});

		onMounted(async () => {
			// 歌手详情
			const result = await getSingerDetail(cacheSinger.value);
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
