import { defineComponent } from 'vue';
import { TreeItem, TreeProps, treeProps } from './tree-types';

export default defineComponent({
  name: "STree",
  props: treeProps,
  setup(props: TreeProps) {
    console.log("props", props.data);

    const Indent = () => <span style="display: inline-block; width: 16px; height: 16px"></span>

    const renderNode = (item: TreeItem) => {
      const paddingLeft = item.level ? 24 * (item.level - 1) + "px" : "0px";
      return (
        <div style={paddingLeft} key={item.level}>
          {item.children ? <IconOpen /> : <Indent />}
          {item.label}
        </div>
      )
    }

    const renderTree = (tree: TreeItem[]) => {
      return tree.map(item => {
        if (!item.children) {
          return renderNode(item);
        } else {
          <>
            {renderNode(item)}
            {renderTree(item.children)}
          </>
        }
      })
    }

    return () => <div>
      {
        props.data.map(item => <div key={item.label}>{item.label}</div>)
      }
    </div>
  }
})