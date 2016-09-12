import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import endInfor from '../components/endgood'
import Panel from 'components/Panel'
import {endDetail,end} from '../modules/endgoods'

class InfoEnd extends Component {
    constructor(props) {
        super(props);        
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    
    componentDidMount() {  
        const {endDetail,params} = this.props;
        //获取详情信息
        endDetail(params);
        
    }
    // 退款详情处理
    handleSubmit(value, key) {
        const _this = this;
        const {end,params} = _this.props;
        Object.assign(value,params)
        end(value).then(function(response) {
            if (response && response.status == 1) {
                setTimeout(() => {
                    let pathname = '/service/aftersale';
                    _this.context.router.replace(pathname);
                }, 1000);
            }
        })
    }
 
    
    render() {
        const {result, loading} = this.props;
        console.log(result,'111')
        return <Panel title="结束商品退货">
                    <endInfor result = {result} handleSubmit = {this.handleSubmit} />
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
    end
}

endInfor.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const {result,loading} = state.endgoodsinfo;
    return { result, loading};    
}

export default connect(mapStateToProps, mapActionCreators)(InfoEnd)

