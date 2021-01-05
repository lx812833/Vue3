import { defineComponent, ref, PropType, watch } from 'vue';
export default defineComponent({
  name: "SelectionWidget",
  props: {
    value: {},
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true
    },
    options: {
      type: Array as PropType<{
        key: string,
        value: any
      }[]>,
      required: true
    }
  },
  setup(props) {
    const currentVal = ref(props.value);
    // tsx中v-modal的双向绑定
    watch(currentVal, (newVal, oldVal) => {
      if (newVal !== props.value) {
        props.onChange(newVal);
      }
    })
    watch(() => props.value, v => {
      if (v !== currentVal.value) {
        currentVal.value = v;
      }
    })

    return () => {
      const { options } = props;
      return (
        <select multiple={true} v-model={currentVal.value}>
          {
            options.map(item =>
              <option value={item.value}>{item.key}</option>
            )
          }
        </select>
      )
    }
  }
})