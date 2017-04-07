import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import InfoView from '../components/InfoView'
import GoodsInfo from '../components/GoodsInfo'
import Panel from 'components/Panel'
import {refundDetail,verify,addressList,getMoney,returnBack} from '../modules/InfoReducer'
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
        const {refundDetail,addressList,params,result} = this.props;
        //获取详情信息
        refundDetail({refundId:params.refundId}).then((res) => {
            if (res && res.data) {
                let shopid = res.data.shop ? res.data.shop.shopId : ''
                // 获取地址列表
                addressList({shopId:shopid}) 
            }
        });
    }
    // 退款详情处理
    handleSubmit(value, key) {
        const _this = this;
        const {verify,params,returnBack} = _this.props;
        const {isRequired} = _this.props
        // 拒绝凭证
        if (_this.state.photoList) {
             value.cwRefuseProof = (typeof _this.state.photoList) === 'string' ? _this.state.photoList : _this.state.photoList.length ? _this.state.photoList[0].name : '';
         }
        Object.assign(value,params,{afterSaleType:'REFUND_MONEY'})
        if(key === 'review'){
            delete value.tid
            if(!value.optRemark) {
                message.error('请填写退款审批说明!')
            } else {
                Object.assign(value,{processStatus:'PROCESS'})
                verify(value).then(function(response) {
                    if (response && response.status == 1) {
                        setTimeout(() => {
                            let pathname = '/service/aftersale';
                            _this.context.router.replace(pathname);
                        }, 1000);
                    }
                })
            }
        } else if(key === 'return'){
            delete value.afterSaleType
            if(!value.optRemark) {
                message.error('请填写说明!')
            } else {
                returnBack(value).then(function(response) {
                    if (response && response.status == 1) {
                        setTimeout(() => {
                            let pathname = '/order/invoice';
                            _this.context.router.replace(pathname);
                        }, 1000);
                    }
                })
            }
        }
        else if(key === 'refuse') {
            _this.setState({isRequired:true})
            Object.assign(value,{processStatus:'DENY'})
            // delete value.tid
            // if(!value.cwRefuseProof) {
            //     message.error('请上传拒绝退款凭证!')
            // }else 
            if (!value.cwRefuseReason) {
                message.error('请选择拒绝退款原因!')
            } else if (!value.optRemark) {
                message.error('请填写说明!')
            } else {
                verify(value).then(function(response) {
                    if (response && response.status == 1) {
                        setTimeout(() => {
                            let pathname = '/service/aftersale';
                            _this.context.router.replace(pathname);
                        }, 1000);
                    }
                })
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
            delete value.photoList
            if (!value.valueBearType) {
                message.error('请选择商品价值承担！')
            } else if (!value.postBearType) {
                message.error('请选择邮费承担！')
            } else if (! value.shortName) {
                message.error('请选择退货地址！')
            }else {
                delete value.shortName
                verify(value).then(function(response) {
                    if (response && response.status == 1) {
                        setTimeout(() => {
                            let pathname = '/service/aftersale';
                            _this.context.router.replace(pathname);
                        }, 1000);
                    }
                })
            }
            
        } else if(key === 'refuse'){
            if (_this.state.photoList) {
                value.cwRefuseProof = (typeof _this.state.photoList) === 'string' ? _this.state.photoList : _this.state.photoList.length ? _this.state.photoList[0].name : '';
            }
            _this.setState({isDel:true})
            Object.assign(value,{processStatus:'DENY'})
            delete value.shortName
            delete value.fullAddress
            delete value.photoList
            delete value.sellerName
            delete value.sellerPhone
            delete value.sellerPost
            if(value.cwRefuseProof) {
                verify(value).then(function(response) {
                    if (response && response.status == 1) {
                        setTimeout(() => {
                            let pathname = '/service/aftersale';
                            _this.context.router.replace(pathname);
                        }, 1000);
                    }
                })
            } else {
                message.error('请上传退货凭证！')
            }
        }
    }
    render() {
        const { photoList} = this.state;
        const {isRequired,isDel} = this.state        
        const {result, loading,addressLlist} = this.props;
        /*** 地址列表*/
        let addressList = [];
        if (addressLlist) {
            addressList = addressLlist.map(c=> {
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
        let defaultAddress = addressLlist && addressLlist.filter((item) => {

           return item.defaults == true
        })
        return <div>
                  {result.afterSaleType == 'REFUND_MONEY' ? 
                       <Panel title="商品退款审批"><InfoView result = {result} isRequired = {isRequired} handleSubmit = {this.handleSubmit} photoImg = {this.photoImg} photoList = {photoList}></InfoView></Panel> :
                       <Panel title="商品退货处理详情"><GoodsInfo result = {result} addressList = {addressList} addressLlist = {addressLlist}  defaultAddress = {defaultAddress} isDel = {isDel} handleGoodSubmit = {this.handleGoodSubmit} ref = 'form' photoImg = {this.photoImg} photoList = {photoList}></GoodsInfo></Panel> }  
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
    getMoney,
    returnBack
}

InfoView.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const {result,addressLlist,loading} = state.moneyinfo;
    // const {items} = addressLlist || []  
    return { result, loading ,addressLlist};    
}

export default connect(mapStateToProps, mapActionCreators)(Info)

