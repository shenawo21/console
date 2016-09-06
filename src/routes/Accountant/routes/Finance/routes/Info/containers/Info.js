import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import InfoView from '../components/InfoView'
import GoodsInfo from '../components/GoodsInfo'
import Panel from 'components/Panel'
import {view, doAgreeRemit, doRefuseRemit} from '../modules/InfoReducer'
import { message } from 'hen';

class Info extends Component {
  
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this);      
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
        
        const {view, params} = this.props;

        //获取详情信息
        view({
            refundId : params.id
        });
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
               * (同意)
               * 
               * @param value (description)
               */
              handleSubmit(value) {                  
                  const {doAgreeRemit,  doRefuseRemit} = _this.props;
                  if(key === 'review'){
                      let cwRemark = value.cwRemark || '';
                      doAgreeRemit({
                          cwRemark: cwRemark
                      });
                  }else if(key === 'refuse'){
                      let cwRefuseReason = value.cwRefuseReason || '',
                          cwRefuseRemark = value.cwRefuseRemark || '';
                      doRefuseRemit({
                          cwRefuseReason : cwRefuseReason,
                          cwRefuseRemark : cwRefuseRemark
                      })
                  }

              },

              /**
               * (返回)
               */
              handleReset() {
                  _this.context.router.push('/accountant/finance')
              }
          }
      }
    
    
    render() {
        const {item, photoList, isRequired} = this.state;        
        const {result, loading} = this.props;        
        const formOptions = {
            ...this.getFormOptions()
        }
        
        return <Panel title="退款处理"><InfoView item={item} result={result} isRequired={isRequired} photoList={photoList} formOptions={formOptions} /></Panel>
    }
}

Info.propTypes = {    
     view: React.PropTypes.func,
     doAgreeRemit: React.PropTypes.func,
     doRefuseRemit: React.PropTypes.func,
     loading: React.PropTypes.bool
}

const mapActionCreators = {
    view, 
    doAgreeRemit, 
    doRefuseRemit, 
}

InfoView.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const {result, loading} = state.moneyinfo;    
    return { result, loading };    
}

export default connect(mapStateToProps, mapActionCreators)(Info)

