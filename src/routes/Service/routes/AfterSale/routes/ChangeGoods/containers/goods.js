import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import ChangeGoods from '../components/GoodsView'
import Panel from 'components/Panel'
import {chagenDetail,changeVerify,changeEnd} from '../modules/GoodsReducer'
import { message } from 'hen';

class Goods extends Component {
  
    constructor(props) {
        super(props);        
        this.handleSubmit = this.handleSubmit.bind(this); 
    }
    
    componentDidMount() {  
        const {chagenDetail,params} = this.props;
        console.log(params,'params')
        //获取详情信息
        chagenDetail({oid:params.refundId});
    }
    // 退款详情处理
    handleSubmit(value, key) {
        // const _this = this;
        // const {verify,params} = _this.props;
        // Object.assign(value,params,{afterSaleType:'REFUND_MONEY'})
        // if(key === 'review'){
        //     Object.assign(value,{processStatus:'PROCESS'})
        //     verify(value).then(function(response) {
        //             if (response && response.status == 1) {
        //                 setTimeout(() => {
        //                     let pathname = '/service/aftersale';
        //                     _this.context.router.replace(pathname);
        //                 }, 1000);
        //             }
        //         })
        // } else if(key === 'refuse'){
        //     _this.setState({isRequired:true})
        //     Object.assign(value,{processStatus:'DENY'})
        //     if(value.cwRefuseReason) {
        //         verify(value).then(function(response) {
        //             if (response && response.status == 1) {
        //                 setTimeout(() => {
        //                     let pathname = '/service/aftersale';
        //                     _this.context.router.replace(pathname);
        //                 }, 1000);
        //             }
        //         })
        //     } else {
        //         message.error('请选择拒绝退款原因')
        //     }
        // }
    }
    render() {
  
        const {result, loading} = this.props;

        return <div>
                     <Panel title="商品换货"><ChangeGoods result = {result} handleSubmit = {this.handleSubmit} /></Panel> 
              </div>                    
                
    }
}
Goods.contextTypes = {
    router: React.PropTypes.object.isRequired,
};
Goods.propTypes = {
    // view: React.PropTypes.func,
    // items: React.PropTypes.array,
    // totalItems: React.PropTypes.number,    
    // loading: React.PropTypes.bool
}

const mapActionCreators = {
    chagenDetail,
    changeVerify,
    changeEnd
}

Goods.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    console.log(state,'state')
    const {result, loading} = state.changegoods;    
    return { result, loading };    
}

export default connect(mapStateToProps, mapActionCreators)(Goods)

