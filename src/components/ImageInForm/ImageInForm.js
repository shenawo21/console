import React, {Component, PropTypes} from 'react'
import showBigPic from 'components/BigPic'

const ImageInForm = (props) =>  {
    const {data, name} = props

    let image = null,
        imgSrc = data && data[name]

    let showBigPhoto = (imgSrc) => {
        if (imgSrc) {
            showBigPic({
                imgSrc
            })
        }
    }    

    let getImg = (src) => {
        return <span className="photoContainer" onClick={showBigPhoto.bind(this, src)}>
                    <img width="100%" height="100%" src={src}/>
               </span>

    }

    if (Array.isArray(imgSrc)) {
        image = imgSrc.map(function(pItem) {
            return getImg(pItem)
        })
    } else {
        image = getImg(imgSrc)
    }

    return image
}

export default ImageInForm