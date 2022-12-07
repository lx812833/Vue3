import { defineComponent } from "vue";
import iconOPen from "@/assets/images/add.svg";
import iconClose from "@/assets/images/remove.svg";
import "./tree.scss";

export default defineComponent({
  name: "STree",
  props: {
    treeData: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const Indent = () => <span className="indent"></span>

    const renderNode = (item => {
      const paddingLeft = item.level ? 24 * (item.level - 1) + "px" : "0px";

      return (
        <div className="row" style={{ paddingLeft }}>
          {item.children ? <iconOPen className="icon" /> : <Indent /> }
          {item.label}
        </div>
      )
    })

    const renderTree = (tree) => {
      return tree.map(item => {
        if (!item.children) {
          return renderNode(item);
        } else {
          return <>
            {renderNode(item)}
            {renderTree(item.children)}
          </>
        }
      })
    }

    return () => <div className="wrapper">
      {renderTree(props.treeData)}
    </div>;
  },
})