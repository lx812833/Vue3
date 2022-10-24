import { ExtractPropTypes, PropType } from "vue";

export interface TreeItem {
  label: string;
  level: number;
  children?: TreeItem[];
}

export const treeProps = {
  data: {
    type: Array as PropType<TreeItem[]>,
    default: () => []
  }
}

export type TreeProps = ExtractPropTypes<typeof treeProps>