import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import InfoView from '../components/InfoView'
import Panel from 'components/Panel'
import {refundDetail,verify} from '../modules/InfoReducer'

class Info extends Component {
  
    constructor(props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);      
        this.photoImg = this.photoImg.bind(this);
        this.state = {
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
    
    handleSubmit(value, key) {
        const _this = this;
        const {verify,result,params} = _this.props;
        Object.assign(value,params,{afterSaleType:'REFUND_MONEY'})
        if(key === 'review'){
            Object.assign(value,{processStatus:'PROCESS'})
            verify(value).then(function(response) {
                    const _this = this;
                    if (response && response.code == 200) {
                        setTimeout(() => {
                            let pathname = '/service/aftersale';
                            self.context.router.replace(pathname);
                        }, 2000);
                    }
                })
        } else if(key === 'refuse'){
            Object.assign(value,{processStatus:'DENY'})
            verify(value)
        }
    }
    
    
    render() {
        // const {item, photoList} = this.state;        
        const {result, loading} = this.props;   
        
        return <Panel title="商品退款审批"><InfoView result = {result} handleSubmit = {this.handleSubmit} /></Panel>
    }
}

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
    console.log(state,'888')
    const {result, loading} = state.moneyinfo;    
    return { result, loading };    
}

export default connect(mapStateToProps, mapActionCreators)(Info)

