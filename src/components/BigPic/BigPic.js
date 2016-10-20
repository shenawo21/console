import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import classes from './BigPic.less'
import close from './close.png'

class BigPic extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isShow: 'show'
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.isShow == 'hide' &&
            nextProps.isShow) {
            this.setState({
                isShow: 'show'
            })
        }
    }

    render() {
        const isShow = {
            show: classes.show,
            hide: classes.hide
        }, {imgSrc} = this.props

        return <div className={isShow[this.state.isShow]}>
                   <div className={classes.grayBg}></div>
                    <div className={classes.bigPicBox}>
                        <img className={classes.close} src={close} onClick={this.close.bind(this)}/>
                        <div className={classes.bigPicCon}>
                            <img className={classes.bigPic} src={imgSrc}/>
                        </div>
                    </div>                           
                </div>
    }

    close() {
        this.setState({
            isShow: 'hide'
        })
    }        
}


const showBigPic = (() => {
    let root = null

    return (params) => {
        if (!root) {
            root = document.createElement('div')
            document.body.appendChild(root)
        }

        ReactDOM.render(<BigPic isShow={true} {...params}/>, root);
    }
})()

export default showBigPic