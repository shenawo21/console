import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import EndgoodView from '../components/ChangeDetailView'
import Panel from 'components/Panel'
import {endChange,endDetail} from '../modules/changedetail'
import { message } from 'hen';

class Goods extends Component {
  
    constructor(props) {
        super(props);         
        this.handleSubmit = this.handleSubmit.bind(this); 
    }
    
    componentDidMount() {  
        const {endDetail,params} = this.props;
        console.log(params,'params')
        //获取详情信息
        endDetail(params);

    }
    // 结束换货
    handleSubmit(value, key) {
        const _this = this;
        const {endChange,params} = _this.props;
        Object.assign(value,params)
        if(key === 'review'){
            endChange(value).then(function(response) {
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
        return <Panel title="商品换货详情">
                    <EndgoodView result = {result} handleSubmit = {this.handleSubmit}  />
                </Panel>                     
                
    }
}
Goods.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

const mapActionCreators = {
    endChange,
    endDetail
}

Goods.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const {result,loading} = state.changedetail;
    return { result, loading};   
}

export default connect(mapStateToProps, mapActionCreators)(Goods)

