import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import EditView from '../components/EditView'
import Panel from 'components/Panel'
import {addItem, modifyItem, view} from '../modules/EditReducer'

class Edit extends Component {
  
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this);       
        
        this.state = {
            item: {}
        }
    }
    
    componentDidMount() {
        const {view, params} = this.props;
        if(params.id) {
            view({
                companyCode: params.id
            });
        }
    }

    componentWillReceiveProps(nextProps, preProps) {
        if(nextProps.jump){
            setTimeout(()=>{
                this.context.router.push('/logistics')
            },600)
        }
    }
    
    /**
     * (表单功能配置项)
     * 
     * @returns (description)
     */
    getFormOptions() {
        const _this = this;
        return {
            /**
             * (筛选表单提交)
             * 
             * @param value (description)
             */
            handleSubmit(value) {
                const {addItem, modifyItem, params} = _this.props;
                if(params.id){
                    modifyItem({
                        companyCode: params.id,
                        ...value
                    })
                }else{
                    addItem({
                        ...value
                    })
                }
            },

            /**
             * (筛选表单重置)
             */
            handleReset() {
            }
        }
    }
    
    render() {
        const {item} = this.state;
        
           const {loading, result} = this.props;
           const formOptions = {
              loading, 
              result,
              'formOptions' : this.getFormOptions()
           }
        
        
        return <Panel title=""><EditView item={item} {...formOptions} /></Panel>
    }
}


Edit.propTypes = {
    modifyItem: React.PropTypes.func,
    addItem : React.PropTypes.func,
    result: React.PropTypes.object,   
    loading: React.PropTypes.bool
}

Edit.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

const mapActionCreators = {
    modifyItem,
    addItem
}

const mapStateToProps = (state) => {
    const {result, jump, loading} = state.edit;
    
    return { result, jump, loading };    
}

export default connect(mapStateToProps, mapActionCreators)(Edit)

