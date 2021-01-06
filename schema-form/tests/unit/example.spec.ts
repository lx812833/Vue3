import { shallowMount } from "@vue/test-utils";
import { defineComponent, h } from 'vue';
// import HelloWorld from "@/components/HelloWorld.vue";

const HelloWorld = defineComponent({
  name: "HelloWorld",
  props: {
    msg: {
      type: String
    }
  },
  setup(props) {
    return () => {
      return h("div", props.msg);
    }
  }
})

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
