import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import InfoView from '../components/InfoView'
import Panel from 'components/Panel'
import {view, doAgreeRemit, doRefuseRemit} from '../modules/InfoReducer'
import { message } from 'hen';

class Info extends Component {
  
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this);      
        this.photoImg = this.photoImg.bind(this);
        this.state = {
            isRequired: false,
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
        
        if(params.state != 1){
            this.setState({
                isRequired: true
            })
        }
    }

    componentWillReceiveProps(nextProps, preProps) {
        if(nextProps.jump){
            setTimeout(()=>{
                this.context.router.push('/accountant/finance')
            },600)
        }
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
              handleSubmit(value, key) {
                  const {doAgreeRemit,  doRefuseRemit, params} = _this.props;
                  if(key === 'review'){
                      doAgreeRemit({
                          refundId: params.id,
                          cwRemark: value.cwRemark
                      });
                  }else if(key === 'refuse'){
                      if (_this.state.photoList) {
                            value.cwRefuseProof = (typeof _this.state.photoList) === 'string' ? _this.state.photoList : _this.state.photoList.length ? _this.state.photoList[0].name : '';
                      }
                      doRefuseRemit({
                          refundId: params.id,
                          cwRefuseReason : value.cwRefuseReason,
                          cwRefuseRemark : value.cwRefuseRemark,
                          cwRefuseProof: value.cwRefuseProof
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
        
        return <Panel title="退款处理"><InfoView item={item} result={result} isRequired={isRequired} photoList={photoList} photoImg={this.photoImg} formOptions={formOptions} /></Panel>
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

Info.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const {result, loading, jump} = state.info;    
    return { result, loading, jump };    
}

export default connect(mapStateToProps, mapActionCreators)(Info)

