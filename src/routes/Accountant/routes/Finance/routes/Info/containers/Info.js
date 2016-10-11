import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import InfoView from '../components/InfoView'
import Panel from 'components/Panel'
import {view, doAgreeRemit, doRefuseRemit} from '../modules/InfoReducer'
import { message,Modal} from 'hen';

class Info extends Component {
  
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this);      
        this.photoImg = this.photoImg.bind(this);
        this.handleOk = this.handleOk.bind(this)
        this.state = {
            isRequired: false,
            item: {},
            visible: false,
            submintValue:'',
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
                      let submintValue = { refundId: params.id,cwRemark: value.cwRemark}
                      _this.setState({submintValue})
                      doAgreeRemit(submintValue).then((res) =>{
                            if (res.status == 2 && res.message == 'VALIDATE_MEESSAGE_NEED') {
                                _this.setState({visible:true})
                            }
                        });
                  } else if(key === 'refuse'){
                      if (_this.state.photoList) {
                            value.cwRefuseProof = (typeof _this.state.photoList) === 'string' ? _this.state.photoList : _this.state.photoList.length ? _this.state.photoList[0].name : '';
                      }
                      if (value.cwRefuseProof) {
                          doRefuseRemit({
                            refundId: params.id,
                            cwRefuseReason : value.cwRefuseReason,
                            cwRefuseRemark : value.cwRefuseRemark,
                            cwRefuseProof: value.cwRefuseProof
                        })
                      } else {
                          message.error('请上传拒绝退款凭证!')
                      }
                      
                  }

              },

              /**
               * (返回)
               */
              handleReset() {
                  _this.context.router.push('/accountant/finance')
              },
              /**
               * (关闭输入验证码弹出框)
               */
              handleCancel() {
                _this.setState({
                    visible: false,
                });
            } 
          }
      }
      handleOk (values,fresh) {
          const {doAgreeRemit} = this.props
          const {submintValue} = this.state
          let data = Object.assign(values,submintValue);
          const context = this;
          doAgreeRemit(data).then(function(res) {
            if (res.status == 1) {
                context.setState({
                    visible: false,
                });
            } 
        })
      }
    
    render() {
        const {item, photoList, isRequired,visible,handleOk} = this.state;        
        const {result, loading} = this.props;        
        const formOptions = {
            ...this.getFormOptions()
        }
        
        return <Panel title="退款处理"><InfoView visible = {visible} handleOk = {this.handleOk} item={item} result={result} isRequired={isRequired} photoList={photoList} photoImg={this.photoImg} formOptions={formOptions} /></Panel>
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

