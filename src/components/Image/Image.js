import React, {Component, PropTypes} from 'react';
import store from 'store2';

let imageServiceUrl = __DEV__ ? 'http://10.0.0.97:8081/file-service/image/' : store('USER') ? store('USER').fileUrl + 'image/' : '/file-service/image/';

// 1x1
const defaultImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=";
/*
  拼装图片完整链接
  @domain 图片系统编码，根据各各业务的系统编码设定，默认product
  @type 图片业务类型，根据各业务类型设定，默认base
  @name 图片名称
  @thumbnail 缩略图配置，格式为100x100
*/

const getImageUrl = (props) => {
    const {domain = 'product', type = 'base', name, thumbnail} = props;
    const url = imageServiceUrl + domain + '/' + type + '/' + name;
    if(thumbnail){
        return url + '!' + thumbnail;
    }
    return url;
}


const Image = (props) =>  {
    let {src, absoluteUrl = true, linked, ...other} = props;

    if(!src){
        return <span>暂无图片</span>
    }
	if(absoluteUrl){
		src = getImageUrl({name:src,...other})
	}
	// 图片
	const img = <img {...props} src={src} onError={(e)=>{
        e.target.src = defaultImage
    }}/>

	const fullUrl = src.replace(/!(\d+)x(\d+)/gi,'');

    return linked ? <a href={fullUrl} target="_blank">{img}</a> : img;
};


Image.getImageUrl = getImageUrl;


export default  Image;