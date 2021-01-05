import { defineComponent, PropType } from "vue";
import { FiledPropsDefine, Schema } from '../types';
import { useVJSFContext } from "../context";
import SelectionWidget from "../widgets/Selection";
import { createUseStyles } from "vue-jss";

const useStyles = createUseStyles({
  container: {
    border: "1px solid #eee",
  },
  actions: {
    background: "#eee",
    padding: 10,
    textAlign: "right",
  },
  action: {
    "& + &": {
      marginLeft: 10,
    },
  },
  content: {
    padding: 10,
  },
})

const ArrayItemWrapper = defineComponent({
  name: "ArrayItemWrapper",
  props: {
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onUp: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDown: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, { slots }) {
    const classesRef = useStyles();
    return () => {
      const classes = classesRef.value;
      const handleAdd = () => props.onAdd(props.index);
      const handleDown = () => props.onDown(props.index);
      const handleUp = () => props.onUp(props.index);
      const handleDelete = () => props.onDelete(props.index);

      return (
        <div class={classes.container}>
          <div class={classes.actions}>
            <button class={classes.action} onClick={handleAdd}>
              新增
            </button>
            <button class={classes.action} onClick={handleDown}>
              删除
            </button>
            <button class={classes.action} onClick={handleUp}>
              上移
            </button>
            <button class={classes.action} onClick={handleDelete}>
              下移
            </button>
          </div>
          <div class={classes.content}>
            {slots.default && slots.default()}
          </div>
        </div>
      )
    }
  }
})

export default defineComponent({
  name: "ArrayField",
  props: FiledPropsDefine,

  setup(props) {
    const context = useVJSFContext();

    const handleArrayItemChange = (v: any, index: number) => {
      const { value } = props;
      const array = Array.isArray(value) ? value : [];
      array[index] = v;
      props.onChange(array);
    }

    const handleAdd = (index: number) => {
      const { value } = props;
      const arr = Array.isArray(value) ? value : [];
      arr.splice(index + 1, 0, undefined);
      props.onChange(arr);
    }

    const handleDelete = (index: number) => {
      const { value } = props;
      const arr = Array.isArray(value) ? value : [];
      arr.splice(index, 1);
      props.onChange(arr);
    }

    const handleUp = (index: number) => {
      if (index === 0) return;
      const { value } = props;
      const arr = Array.isArray(value) ? value : [];
      const item = arr.splice(index, 1);
      arr.splice(index - 1, 0, item[0]);
      props.onChange(arr);
    }

    const handleDown = (index: number) => {
      const { value } = props;
      const arr = Array.isArray(value) ? value : [];
      if (index === arr.length - 1) return;
      const item = arr.splice(index, 1);
      arr.splice(index + 1, 0, item[0]);
      props.onChange(arr);
    }

    return () => {
      const { schema, rootSchema, value } = props;
      const SchemaItem = context.SchemaItem;
      const isMultiType = Array.isArray(schema.items);
      // 判断是否是多类型数组
      const isSelect = schema.items && (schema.items as any).enum;
      if (isMultiType) {
        const items: Schema[] = schema.items as any;
        const array = Array.isArray(value) ? value : [];
        return items.map((s: Schema, index: number) => {
          <SchemaItem
            schema={s}
            rootSchema={rootSchema}
            value={array[index]}
            onChange={(v: any) => handleArrayItemChange(v, index)}
            key={index}
          ></SchemaItem>
        })
      } else if (!isSelect) {
        const array = Array.isArray(value) ? value : [];
        return array.map((v: Schema, index: number) => {
          return <ArrayItemWrapper
            index={index}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onUp={handleUp}
            onDown={handleDown}
          >
            <SchemaItem
              schema={schema.items as Schema}
              value={v}
              key={index}
              rootSchema={rootSchema}
              onChange={(v: any) => handleArrayItemChange(v, index)}
            ></SchemaItem>
          </ArrayItemWrapper>
        })
      } else {
        const enumOptions = (schema as any).items.enum;
        const options = enumOptions.map((item: any) => ({
          key: item,
          value: item
        }))
        return <SelectionWidget
          onChange={props.onChange}
          value={props.value}
          options={options}
        ></SelectionWidget>
      }
    }
  }
})