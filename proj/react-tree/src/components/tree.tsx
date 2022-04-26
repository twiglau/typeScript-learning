import React from 'react';
import './main.css';
import { TreeData } from '../typings';
import TreeNode from './tree-nodes';

interface Props {// 接口类型, 可以用来装饰 或者 约束 属性对象
    data: TreeData
}
//Props是用来限制 this.props  State 是用来来限定 this.state
interface State {// 组件的状态
    data: TreeData
}
interface KeyNodeMap {
    // 属性名任意, 值是一个 TreeData 类型
    [key: string] : TreeData
}
class Tree extends React.Component<Props> {
    keyNodeMap: KeyNodeMap;
    state: State = {data: this.props.data};
    constructor(props: Props){
        super(props);
        this.keyNodeMap = {};
        //Warning: Can't call setState on a component that is not yet mounted.
        //this.buildKeyMap(); // 创建一个 keyMap key
    }
    componentDidMount(){
        this.buildKeyMap();
    }
    buildKeyMap = () => {
        let data: TreeData = this.state.data;
        this.keyNodeMap = {};
        this.keyNodeMap[data.key] = data; // data 是根节点
        if(data.children && data.children.length > 0) {
            this.walk(data.children, data);
        }
    }
    walk = (children: TreeData[], parent: TreeData): void => {
        children.forEach((item:TreeData)=>{
            item.parent = parent; // 在节点上增加一个 parent 属性, 指定自己的父亲
            this.keyNodeMap[item.key] = item;
            if(item.children && item.children.length > 0){
                this.walk(item.children, item);
            }
        })
    }
    onCollapse = (key: string)=>{
        let data = this.keyNodeMap[key];
        if(data){
            let { children } = data;
            if(children){
                data.collapsed = !data.collapsed;
                data.children = data.children || []; // 后面会改成赖加载
                this.setState({data: this.state.data});
            }else{//如果没有 children 属性, 则说明儿子未加载, 需要加载
                data.loading = true;
                this.setState({data: this.state.data});
                setTimeout(()=>{
                    data.children = [
                        {
                            name: data.name + '的儿子1',
                            key: `${data.key}-1`,
                            type: 'folder',
                            collapsed: true
                        },
                        {
                            name: data.name + '的儿子2',
                            key: `${data.key}-2`,
                            type: 'folder',
                            collapsed: true
                        }
                    ]
                    data.loading = false;
                    data.collapsed = false;
                    this.buildKeyMap();
                    this.setState({data: this.state.data});
                },2000);
            }
        }
    }
    onCheck = (key: string) => {
        let data = this.keyNodeMap[key];
        if(data){
            data.checked = !data.checked; // 先把自己取反
            if(data.checked){ //如果新的状态为true
                this.checkChildren(data.children, true);
                this.checkParent(data.parent); // 如果一个节点, 它所有的子节点都被选中, 自己也要被选中
            } else {
                this.checkChildren(data.children, false); // 让所有的下级节点取消选中
                this.cancelParentChecked(data.parent);
            }
            this.setState({data: this.state.data});
        }
        
    }
    cancelParentChecked = (parent?: TreeData)=> {
        while(parent){
            parent.checked = false;
            parent = parent.parent;
        }
    }
    checkParent = (parent?: TreeData) => {
        while(parent){
            parent.checked = parent.children?.every((item: TreeData)=> item.checked);
            parent = parent.parent;
        }
    }
    checkChildren = (children?: TreeData[], checked?:boolean) => {
        children && children.forEach((item: TreeData)=>{
            item.checked = checked;
            this.checkChildren(item.children, checked);
        })
    }
    render(){
        return (
            <div className='tree'>
                <div className='tree-nodes'>
                    <TreeNode 
                    data={this.props.data} 
                    onCollapse={this.onCollapse}
                    onCheck={this.onCheck}
                    />
                </div>
            </div>
        )
    }
}

export default Tree;