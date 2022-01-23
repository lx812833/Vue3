<template>
	<div class="singer-detail">歌手详情页</div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { getSingerDetail } from "@/server/singer";

export default defineComponent({
	name: "SingerDetail",
  props: {
    singer: Object
  },
  setup(props) {
    onMounted(() => {
      // 歌手详情
      getSingerDetail(props.singer).then(res => {
        console.log("歌手歌曲", res);
      })
    })

    return {

    }
  }
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
