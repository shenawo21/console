import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import InfoView from '../components/InfoView'
import GoodsInfo from '../components/GoodsInfo'
import Panel from 'components/Panel'
import {refundDetail,verify} from '../modules/InfoReducer'
import { message } from 'hen';

class Info extends Component {
  
    constructor(props) {
        super(props);        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGoodSubmit = this.handleGoodSubmit.bind(this);      
        this.photoImg = this.photoImg.bind(this);
        this.state = {
            isRequired:false,
            item: {},
            photoList: []
        }
    }
    photoImg(files) {
        this.setState({
            photoList: files
        })
    }
    
    componentDidMount() {  
        const {refundDetail,params} = this.props;
        //获取详情信息
        refundDetail(params);
    }
    // 退款详情处理
    handleSubmit(value, key) {
        const _this = this;
        const {verify,params} = _this.props;
        Object.assign(value,params,{afterSaleType:'REFUND_MONEY'})
        if(key === 'review'){
            Object.assign(value,{processStatus:'PROCESS'})
            verify(value).then(function(response) {
                    if (response && response.status == 1) {
                        setTimeout(() => {
                            let pathname = '/service/aftersale';
                            _this.context.router.replace(pathname);
                        }, 1000);
                    }
                })
        } else if(key === 'refuse'){
            _this.setState({isRequired:true})
            Object.assign(value,{processStatus:'DENY'})
            if(value.cwRefuseReason) {
                verify(value).then(function(response) {
                    if (response && response.status == 1) {
                        setTimeout(() => {
                            let pathname = '/service/aftersale';
                            _this.context.router.replace(pathname);
                        }, 1000);
                    }
                })
            } else {
                message.error('请选择拒绝退款原因')
            }
        }
    }
    // 退货详情处理
    handleGoodSubmit(value, key) {
        const _this = this;
        const {verify,params} = _this.props;
        Object.assign(value,params,{afterSaleType:'REFUND_GOODS'})
        if(key === 'review'){
            Object.assign(value,{processStatus:'PROCESS'})
            verify(value).then(function(response) {
                    if (response && response.status == 1) {
                        setTimeout(() => {
                            let pathname = '/service/aftersale';
                            _this.context.router.replace(pathname);
                        }, 1000);
                    }
                })
        } else if(key === 'refuse'){
            _this.setState({isRequired:true})
            Object.assign(value,{processStatus:'DENY'})
            if(value.cwRefuseReason) {
                verify(value).then(function(response) {
                    if (response && response.status == 1) {
                        setTimeout(() => {
                            let pathname = '/service/aftersale';
                            _this.context.router.replace(pathname);
                        }, 1000);
                    }
                })
            } else {
                message.error('请选择拒绝退款原因')
            }
        }
    }
    
    render() {
        // const {item, photoList} = this.state;
        const {isRequired} = this.state        
        const {result, loading} = this.props;

        return <div>
                  {result.afterSaleType == 'REFUND_MONEY' ? 
                       <Panel title="商品退款审批"><InfoView result = {result} isRequired = {isRequired} handleSubmit = {this.handleSubmit} /></Panel> :
                       <Panel title="商品退货处理详情"><GoodsInfo result = {result} isRequired = {isRequired} handleGoodSubmit = {this.handleGoodSubmit} /></Panel> }  
              </div>                    
                
    }
}
Info.contextTypes = {
    router: React.PropTypes.object.isRequired,
};
Info.propTypes = {
    // view: React.PropTypes.func,
    // items: React.PropTypes.array,
    // totalItems: React.PropTypes.number,    
    // loading: React.PropTypes.bool
}

const mapActionCreators = {
    refundDetail,
    verify
}

InfoView.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const {result, loading} = state.moneyinfo;    
    return { result, loading };    
}

export default connect(mapStateToProps, mapActionCreators)(Info)

