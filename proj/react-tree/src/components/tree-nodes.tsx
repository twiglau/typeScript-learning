import React from "react";
import './main.css';
import { TreeData } from '../typings';
import file from '../assets/file.png';
import closedFolder from '../assets/closed-folder.png';
import openedFolder from '../assets/opened-folder.png';
import loadingSrc from '../assets/loading.gif';
interface Props {
    data: TreeData;
    onCollapse: any;
    onCheck: any;
}
class TreeNode extends React.Component<Props> {
    constructor(props: Props){
        super(props);
    }
    render() {
        let { data: { name, children, key, collapsed, checked, loading }, onCollapse, onCheck } = this.props;
        let caret = null; // 打开关闭的小箭头 默认为null
        let icon = null; // 图标
        
        if(children){
            if(children.length > 0){
                caret=(
                    <span className={`collapse ${collapsed? 'caret-right':'caret-down'} `}
                    onClick={() => onCollapse(key)}
                    ></span>
                )
                icon = collapsed? closedFolder:openedFolder;
            }else{
                caret = null;
                icon = file;
            }
        }else{
            caret = (
                loading? 
                <img className="collapse c-loading" src={loadingSrc} style={{width:14, top:'50%', marginTop: -7,marginRight:5}} alt="" /> 
                : <span className={'collapse caret-right'}
                onClick={()=> onCollapse(key)}
                ></span>
            )
            icon = closedFolder; // 关闭的文件夹
        }
        return (
            <div className="tree-node">
                <div className="inner">
                    {caret}
                    <span className="content">
                        <input type='checkbox' checked={checked} onChange={()=> onCheck(key)} />
                        <img className="folder-a" src={icon} alt="" />
                        {name}
                    </span>
                </div>
                {
                    (children && children.length > 0 && !collapsed) && (
                        <div className="children">
                            {
                                children.map((item: TreeData) => (
                                    <TreeNode 
                                    onCollapse={this.props.onCollapse}
                                    key={item.key} 
                                    onCheck={onCheck}
                                    data={item} />
                                ))
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}

export default TreeNode;