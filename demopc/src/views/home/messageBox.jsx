import { defineComponent, ref } from "vue";

export const MessageBox = defineComponent({
  name: "MessageBox",
  setup(props, { attrs, emit, slots }) {
    const list = ref(["one", "two", "three"]);

    return () => (
      <div>
        {/* 默认插槽 */}
        {slots.default()}

        {list.value.map((item) => (
          <button onClick={() => {
            emit("jsxClick", item);
            console.log("item", item)
          }} key={item}>{attrs.msg}-{item}</button>
        ))}

        {/* 具名插槽 */}
        {slots.header()}
      </div>
    );
  },
});