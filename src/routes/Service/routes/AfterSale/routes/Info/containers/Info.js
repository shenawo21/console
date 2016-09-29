import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import InfoView from '../components/InfoView'
import GoodsInfo from '../components/GoodsInfo'
import Panel from 'components/Panel'
import {refundDetail,verify,addressList,getMoney} from '../modules/InfoReducer'
import { message } from 'hen';

class Info extends Component {
  
    constructor(props) {
        super(props);        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGoodSubmit = this.handleGoodSubmit.bind(this);
        this.photoImg = this.photoImg.bind(this);
        this.state = {
            isRequired:false,
            isDel:false,
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
        const {refundDetail,addressList,params} = this.props;
        //获取详情信息
        refundDetail(params);
        
        // 获取地址列表
        addressList()
    }
    // 退款详情处理
    handleSubmit(value, key) {
        const _this = this;
        const {verify,params} = _this.props;
        // if (_this.state.photoList) {
        //      value.businessLicense = (typeof _this.state.photoList) === 'string' ? _this.state.photoList : _this.state.photoList.length ? _this.state.photoList[0].name : '';
        //  }
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
        let addressObj = _this.refs.form.state
        Object.assign(value,params,addressObj,{afterSaleType:'REFUND_GOODS'})
        if(key === 'review'){
            Object.assign(value,{processStatus:'PROCESS'})
            delete value.shortName
            verify(value).then(function(response) {
                    if (response && response.status == 1) {
                        setTimeout(() => {
                            let pathname = '/service/aftersale';
                            _this.context.router.replace(pathname);
                        }, 1000);
                    }
                })
        } else if(key === 'refuse'){
            _this.setState({isDel:true})
            Object.assign(value,{processStatus:'DENY'})
            if(value.sellerRemark) {
                verify(value).then(function(response) {
                    if (response && response.status == 1) {
                        setTimeout(() => {
                            let pathname = '/service/aftersale';
                            _this.context.router.replace(pathname);
                        }, 1000);
                    }
                })
            } else {
                message.error('请选择拒绝退货原因')
            }
        }
    }
    render() {
        const { photoList} = this.state;
        const {isRequired,isDel} = this.state        
        const {result, loading,items} = this.props;
        /*** 地址列表*/
        let addressList = [];
        if (items) {
            addressList = items.map(c=> {
            return {
                value: c.id,
                title: c.shortName
           }
        });
        } else {
            addressList = [{
                value: null,
                title: '正在加载中...'
            }]
        }
        return <div>
                  {result.afterSaleType == 'REFUND_MONEY' ? 
                       <Panel title="商品退款审批"><InfoView result = {result} isRequired = {isRequired} handleSubmit = {this.handleSubmit} photoImg = {this.photoImg} photoList = {photoList}></InfoView></Panel> :
                       <Panel title="商品退货处理详情"><GoodsInfo result = {result} addressList = {addressList} items = {items} isDel = {isDel} handleGoodSubmit = {this.handleGoodSubmit} ref = 'form'></GoodsInfo></Panel> }  
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
    verify,
    addressList,
    getMoney
}

InfoView.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const {result,addressLlist,loading} = state.moneyinfo;
    const {items} = addressLlist || []  
    return { result, loading ,items};    
}

export default connect(mapStateToProps, mapActionCreators)(Info)

