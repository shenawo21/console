import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import EndgoodView from '../components/EndgoodView'
import Panel from 'components/Panel'
import {endDetail,end,getMoney} from '../modules/endgoods'

class InfoEnd extends Component {
    constructor(props) {
        super(props);        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.NoticehandleSubmit = this.NoticehandleSubmit.bind(this);
    }

    
    componentDidMount() {  
        const {endDetail,params} = this.props;
        //获取详情信息
        endDetail(params);
        
    }
    // 结束退货
    handleSubmit(value, key) {
        const _this = this;
        const {end,params} = _this.props;
        Object.assign(value,params)
        if(key === 'review'){
            end(value).then(function(response) {
                console.log(value,'1')
                if (response && response.status == 1) {
                    setTimeout(() => {
                        let pathname = '/service/aftersale';
                        _this.context.router.replace(pathname);
                    }, 1000);
                }
            })
        }  
    }
    // 通知财务退款
    NoticehandleSubmit (value, key) {
         const _this = this;
         const {params,getMoney} = _this.props;
         Object.assign(value,params)
         if (key === 'notice') {
            getMoney(value).then(function(response) {
                console.log(value,'2')
                if (response && response.status == 1) {
                    setTimeout(() => {
                        let pathname = '/service/aftersale';
                        _this.context.router.replace(pathname);
                    }, 1000);
                }
            })
        }
    }
 
    
    render() {
        const {result, loading} = this.props;
        return <Panel title="结束商品退货">
                    <EndgoodView result = {result} handleSubmit = {this.handleSubmit} NoticehandleSubmit = {this.NoticehandleSubmit} />
                </Panel>                            
    }
}
InfoEnd.contextTypes = {
    router: React.PropTypes.object.isRequired,
};
InfoEnd.propTypes = {
    // view: React.PropTypes.func,
    // items: React.PropTypes.array,
    // totalItems: React.PropTypes.number,    
    // loading: React.PropTypes.bool
}

const mapActionCreators = {
    endDetail,
    end,
    getMoney
}

const mapStateToProps = (state) => {
    const {result,loading} = state.endgoodsinfo;
    return { result, loading};    
}

export default connect(mapStateToProps, mapActionCreators)(InfoEnd)

