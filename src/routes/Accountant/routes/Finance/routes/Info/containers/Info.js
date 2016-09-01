import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import InfoView from '../components/InfoView'
import Panel from 'components/Panel'
import {view} from '../modules/InfoReducer'

class Info extends Component {
  
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this);      
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
        
        const {view} = this.props;

        //获取详情信息
        view();
    }
    
      /**
       * (表格功能配置项)
       * 
       * @returns (description)
       */
      getFormOptions() {
          const _this = this;
          return {
              /**
               * (表单提交)
               * 
               * @param value (description)
               */
              handleSubmit(value) {                  
                  
              },

              /**
               * (返回)
               */
              handleReset() {
                  _this.context.router.push('/Warehouse')
              }
          }
      }
    
    
    render() {
        const {item, photoList} = this.state;        
        const {shopListResult, totalItems, loading} = this.props;        
        const formOptions = {
            ...this.getFormOptions()
        }
        
        return <Panel title="商品退款审批"><InfoView item={item} photoList={photoList} formOptions={formOptions} /></Panel>
    }
}

Info.propTypes = {
    view: React.PropTypes.func,
    items: React.PropTypes.array,
    totalItems: React.PropTypes.number,    
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    view
}

InfoView.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const {result, loading} = state.moneyinfo;    
    return { result, loading };    
}

export default connect(mapStateToProps, mapActionCreators)(Info)

