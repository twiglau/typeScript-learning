export interface TreeData {
    name: string;
    key: string;
    type: string;
    collapsed?: boolean;
    children?: Array<TreeData>;
    parent?: TreeData;
    checked?: boolean; // 是否选中
    loading?: boolean; // 是否正在加载中
}