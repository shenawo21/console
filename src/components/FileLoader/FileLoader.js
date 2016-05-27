import React from 'react';
import {Button, Icon, Upload, message, Alert} from 'hen';
import Image from '../Image';
import './fileloader.less';

const getImageUrl = Image.getImageUrl;
/*
  DownLoader  导出文件
  @url 接口url， 必填
  @bType button类型配置 ，默认ghost
  @iType icon类型配置 ，默认download
  @title 导出按钮标题， 默认为空
  @params 接口导出查询条件

  @example 默认情况配url和title即可，如果涉及到查询条件导出，需要配置params
           <DownLoader title='导出映射信息' url=‘/api-channelMapping.exportChannelMapping’ />
*/

export const DownLoader = (props) => {
    const {url, bType = 'ghost', iType = 'download', title = '', params, onClick, disabled} = props;
    let curUrl = url;
    if (params) {
        let mapParams = [];
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                if (params[key] === null || params[key] === undefined) {
                    delete params[key];
                } else {
                    var value = params[key]
                    if (Array.isArray(value)) {
                        mapParams.push(value.map(_id=>key+'='+_id).join('&'));
                    }else{
                        mapParams.push(key + '=' + value);
                    }
                }
            }
        }
        let urlParams = curUrl.indexOf('?') != -1 ? mapParams.join('&') : '?' + mapParams.join('&')
        curUrl += urlParams;
    }

    if (curUrl) {
        curUrl = '/suneee-cloud' + curUrl
    }

    return <a href={disabled && curUrl ? "javascript:;" : curUrl} ><Button type={bType} disabled={disabled} onClick={onClick}><Icon type={iType}/>{title}</Button></a>
}

/**
 * 获取上传文件列表，转化成upload需要的格式
 * @param  {string|array} input
 * @param  {object} originFile 原始文件对象
 * @example
 *      {
            uid: 'uid',      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
            name: 'xx.png'   // 文件名
            status: 'done',  // 状态有：uploading done error removed
            url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',         // 图片链接
            thumbUrl : 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'    //点击图片显示链接
        }
 */
const getFileList = (input, originFile = { status: 'done' }) => {

    //删除时，图片为空数组
    if (null !== input && input && !input.length) {
        return '';
    }

	/**
	 * 格式化上传数据
	 * @param  {any} name
	 * @param  {any} index
	 * @param  {any} status
	 */

    const format = (name, index, status) => {
        return {
            uid: -index++,
            name,
            status,
            url: getImageUrl({ name }),
            thumbUrl: getImageUrl({ name })
        }
    }
    // 处理编辑模式下字符串的情况
    if (typeof input === 'string') {
        input = input.split(',')
        return input.map((f, index) => {
            return format(f, index, originFile.status)
        })
    }

    // 正常上传的情况
    return input.map((file, index) => {
        if (file.response) {
            const data = file.response.data;
            const fileName = data ? data.fileName : '';
            return format(fileName, index, originFile.status)
        }
        return file
    })
}

/*
  UpLoader  导入文件
  @upConfig 导入配置项， 必填
  @bType button类型配置 ，默认ghost
  @iType icon类型配置 ，默认download
  @title 导入按钮标题， 默认为空

  @example 默认情况配upConfig的ation和title
      <UpLoader title='导入映射信息' upConfig={{action: '/api-channelMapping.importChannelMapping'}} />
*/
export const UpLoader = (props) => {
    console.log(props)
    const {upConfig = {}, onChange, ...other} = props;

    let {action, imgDomain, fileList = [], onChangeFileList, onlyFile = false} = upConfig;
    fileList = fileList || [];
    const {bType = 'ghost', iType = 'upload', title = '', children, className = ''} = other;

    if (imgDomain) {  //图片上传
        upConfig.action = '/file-service' + action;
    } else {          //文件上传
        upConfig.action = '/suneee-cloud' + action;
    }

    if (typeof fileList === 'string') {
        fileList = getFileList(fileList)
    }

    let config = {
        showUploadList: false,
        action: '/',
        multiple: true,
        onChange(info) {
            if (info.file.status !== 'uploading') {
                if (info.file.status === 'removed') {//删除图片时触发
                    onChangeFileList && onChangeFileList(info.fileList);
                }
            }
            if (info.file.status === 'done') {
                if (info.file.response.status == '1') {
                    message.success(info.file.name + ' 上传成功。');
                    let uploadFormItem = '';
                    if (onlyFile) {
                        info.fileList = info.fileList.slice(-1);
                    }
                    let newFileLists = getFileList(info.fileList, info);

                    if (onlyFile) {
                        uploadFormItem = newFileLists[0]['name']
                    } else {
                        uploadFormItem = newFileLists.map(f => f.name).join(',')
                    }
                    //返回图片显示对象newFileLists，及图片名称uploadFormItem
                    onChangeFileList && onChangeFileList(newFileLists, uploadFormItem);
                    //form 表单设置用
                    onChange && onChange(uploadFormItem);
                } else {
                    message.error(info.file.name + info.file.response.message);
                };
            } else if (info.file.status === 'error') {
                message.error(info.file.name + ' 上传失败。');
            }
        },
        //判断上传文件类型
        beforeUpload: function(file) {
            const isFile = /\.(xls|xlsx)$/ig.test(file.name);
            const isOnly = onlyFile && fileList.length;
            if (!isFile) {
                message.error('只能上传 xls或xlsx 后缀文件！');
                if (isOnly) {
                    message.warn('只能上传一个文件');
                    return false;
                }
            }
            return isFile;
        }
    }

    const uploadConfig = {...config, ...upConfig };
    return <div className={className} >
            <Upload {...uploadConfig} fileList={fileList}>
                {children ? children : uploadConfig.listType == 'picture-card' ? <div><Icon type="plus" /><div className="ant-upload-text">上传照片</div></div> : <Button type={bType}><Icon type={iType}/>{title}</Button>}
            </Upload>
        {!onlyFile ? '' : fileList.length == 0 ? <span style={{ display: 'inline-block' }}><Alert showIcon message='只能上传一个文件' type='warn' /></span> : ''}
    </div>
}

/*
  UploadImage 图片上传配置文件
  @upConfig 导入配置项， 必填
  @bType button类型配置 ，默认ghost
  @iType icon类型配置 ，默认download
  @title 导入按钮标题， 默认为空
  @imgDomain 图片系统编码，根据各各业务的系统编码设定，默认product
  @imgType 图片业务类型，根据各业务类型设定，默认base
  @showUploadList 是否展示 uploadList，默认false
  @onChangeFileList 上传成功后的回调函数，files为fileList数组集合
  @fileList 初始图片列表
  @listType 上传列表的内建样式，支持两种基本样式 text or picture，默认picture
  @beforeUpload 图片上传前置条件函数，前置条件：默认图片，大小不能超过1m
  @onlyFile 是否只能上传一个文件

  @example
    引入文件：
    import {UploadImage} from 'components';

    配置项：
    let upConfig = {
        showUploadList : true,
        onChangeFileList(files, fileName) {
            console.log(files, fileName);
        },
        fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
            thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
        }, {
            uid: -2,
            name: 'yyy.png',
            status: 'done',
            url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
            thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
        }]

    };
    使用：
    <UploadImage upConfig={upConfig} title="选择图片" className='upload-list-inline'></UploadImage>
*/


// 枚举图片系统编码,业务类型全暂定base
const IMADOMAINPATH = {
    'product': 'product',
    'system': 'system'
};

export const UploadImage = (props) => {
    const {upConfig,  ...other} = props;
    let {action, listType, beforeUpload, imgDomain, fileList = [], imgType = 'base', onlyFile = false} = upConfig;
    fileList = fileList || [];
    upConfig.imgDomain = imgDomain ? imgDomain : 'product';
    upConfig.action = action ? action : '/file-api.upload?domain=' + IMADOMAINPATH[upConfig.imgDomain] + '&type=' + imgType;
    upConfig.listType = listType ? listType : 'picture';
    if (onlyFile) {
        upConfig.multiple = false;
    }
    upConfig.beforeUpload = beforeUpload ? beforeUpload : (file) => {
        const isFile = /\.(jpg|jpeg|gif|png|bmp)$/ig.test(file.name);
        if (!isFile) {
            message.error('只能上传 jpg、jpeg、gif、png、bmp 后缀图片文件！', 2);
            return isFile;
        }
        if (file.size > 1000000) {
            message.error('只能上传 小于1M 图片文件！', 2);
            return false;
        }
        if (onlyFile && fileList.length) {
            message.warn('只能上传一个文件');
            return false;
        }
    }
    return UpLoader({
        upConfig: {...upConfig},
        ...other
    });
}
UploadImage.getFileList = getFileList;

