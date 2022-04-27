import React, { MutableRefObject, useRef, RefObject, useEffect, useState } from 'react';
import '../index.css';
import { Progress, Icon } from 'antd';

export type DragProps = React.PropsWithChildren<{
    onChange: any;
    name: string;
    action: string;
    // headers: any;
}>

// 每个上传的文件都有这样的一个对象, 记录上传的过程
export interface UploadFile {
    file: File; // 上传的文件
    percent: number; // 当前文件上传的百分比
    url?: string; // 服务器上传成功之后返回的百分比
    status?: string; // 状态 initial uploading error done
}
// type FC<P = {}> = FunctionComponent<P>;
const Dragger: React.FC<DragProps> = function (props: DragProps): JSX.Element {
    let [uploadFiles, setUploadFiles] = useState<Array<UploadFile>>([]);
    // {current: 指向真正要引用的元素}  第一次渲染 current=undefined, 从第二次开 current 就指向真实的 DOM 元素, 从第二次开始指向就不再改变了
    let uploadContainer: MutableRefObject<HTMLDivElement|undefined> = useRef<HTMLDivElement|undefined>();
    const onDragEnter:(en: DragEvent)=> any = (ev: DragEvent): any => {
        ev.preventDefault(); // 组织默认事件
        ev.stopPropagation();
    }
    const onDragOver:(en: DragEvent)=> any = (ev: DragEvent): any => {
        ev.preventDefault(); // 组织默认事件
        ev.stopPropagation();
    }
    const onDragLeave:(en: DragEvent)=> any = (ev: DragEvent): any => {
        ev.preventDefault(); // 组织默认事件
        ev.stopPropagation();
    }
    const onDrop:(en: DragEvent)=> any = (ev: DragEvent): any => {
        ev.preventDefault(); // 组织默认事件
        ev.stopPropagation();
        let transfer: DataTransfer|null = ev.dataTransfer;
        if(transfer && transfer.files){
            upload(transfer.files);
        }
    }
    function upload(files: FileList) {
        console.log('files',files);
        for(let i=0;i<files.length;i++){
            let file = files[i];
            let formData = new FormData();
            formData.append('filename',file.name);
            formData.append(props.name, file);
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.open('POST', props.action, true);
            xhr.responseType = 'json';
            let uploadFile: UploadFile= {file, percent:0, status:'uploading', url: ''};
            uploadFiles.push(uploadFile);
            xhr.onprogress = onUploadProgress;
            xhr.upload.onprogress = onUploadProgress;
            function onUploadProgress(event: ProgressEvent) {
                if(event.lengthComputable){
                    // 当上传的过程中, 会不停的触发 onprogress 事件
                    let percent = parseInt((event.loaded / event.total*100).toFixed(0));
                    uploadFile.percent = percent;
                    if(percent >= 100){
                        uploadFile.status = 'done';
                    }
                    setUploadFiles([...uploadFiles]);
                }
            }
            xhr.onerror = function(){
                uploadFile.status = 'error';
                setUploadFiles([...uploadFiles]);
            }
            xhr.timeout = 10000;
            xhr.ontimeout = function(){
                uploadFile.status = 'error';
                setUploadFiles([...uploadFiles]);
            }
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4 && xhr.status === 200){
                    uploadFile.url = xhr.response.url;
                    props.onChange(uploadFile);
                }
            }
            // for (let key in props.headers) {
            //     xhr.setRequestHeader(key, props.headers[key]);
            // }
            xhr.send(formData);

        }
    }
    // useEffect 中的函数会在组件挂载完成, 真实DOM挂载 完成后执行, 或者 更新完成后执行
    useEffect(()=>{
        uploadContainer.current!.addEventListener('dragenter',onDragEnter);
        uploadContainer.current!.addEventListener('dragover',onDragOver);
        uploadContainer.current!.addEventListener('dragleave',onDragLeave);
        uploadContainer.current!.addEventListener('drop',onDrop);
        // useEffect 会返回一个函数, 它会在组件卸载的时候执行
        return ()=> {
            uploadContainer.current!.removeEventListener('dragenter',onDragEnter);
            uploadContainer.current!.removeEventListener('dragover',onDragOver);
            uploadContainer.current!.removeEventListener('dragleave',onDragLeave);
            uploadContainer.current!.removeEventListener('drop',onDrop);
        }

    },[]);
    // {uploadFile.status==='loading'? <Icon type="loading"/>:<Icon type="paper-clip" />}
    return (
        <>
            <div className='dragger-container' ref={uploadContainer as RefObject<HTMLDivElement> | null}>
                {props.children}
            </div>
            {
                uploadFiles.map((uploadFile: UploadFile, index: number)=>(
                    <div key={index}>
                        <div>
                            <span style={{marginLeft: 10}}>{uploadFile.file!.name}</span>
                        </div>
                        <Progress percent={uploadFile.percent} status={uploadFile.status === 'error' ? 'exception' : undefined} />
                    </div>
                ))
            }
        </>
    )
}

export default Dragger;