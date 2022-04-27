import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Upload, Icon, message } from 'antd';
// const { Dragger } = Upload;
import Dragger, { DragProps, UploadFile } from './Dragger';

const props: DragProps = {
    name: 'file',
    // action: 'https://web-api.hqbhqb.top/bb/app/user/upload',
    action: 'http://localhost:8080/upload',
    // headers:{
    //     'X-Access-Token':'f8f6cc83233a4748a4469b9a59802a47'
    // },
    onChange: (uploadFile: UploadFile) => { // 当上传状态发生改变的时候会执行回调
        console.log(uploadFile);
        const { status } = uploadFile
        if(status == 'done'){
            message.success(`${uploadFile.file.name} 上传成功`);
        } else if(status == 'error') {
            message.success(`${uploadFile.file.name} 上传失败!`);
        }
    }
}

ReactDOM.render(
    <Dragger {...props}>
        <div>+</div>
    </Dragger>,
    document.getElementById('root')
)

