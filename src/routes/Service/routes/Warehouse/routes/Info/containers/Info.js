import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import InfoView from '../components/InfoView'
import Panel from 'components/Panel'
import {view, viewForcheck, doCheck} from '../modules/InfoReducer'

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
        const {view, viewForcheck, params} = this.props;
        console.log(params, 'params');
        //获取详情信息
        if(params.skuid != 1){
            viewForcheck({
                tid: params.id,
                outerSkuId: params.skuid
            });
        }else{
            view({refundId:params.id});
        }        
    }

    componentWillReceiveProps(nextProps, preProps){
        if(nextProps.jump){
            setTimeout(()=>{
                this.context.router.push('/warehouse')
            },600)
        }

        if (!nextProps.params.id) {
            this.setState({
                item: {},
                photoList: []
            })
        } else {
            this.setState({
                item: nextProps.result,
                photoList: nextProps.result ? nextProps.result.photo : []
            })
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
               * (表单提交)
               * 
               * @param value (description)
               */
              handleSubmit(value) {
                  const { doCheck } = context.props;               
                  doCheck({
                      ...value
                  })
              },

              /**
               * (返回)
               */
              goback() {
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
        return <Panel title="验收详情"><InfoView item={item} photoList={photoList} formOptions={formOptions} /></Panel>
    }
}

Info.propTypes = {    
    doCheck: React.PropTypes.func,
    view: React.PropTypes.func,
    viewForcheck: React.PropTypes.func,
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    view,
    viewForcheck,
    doCheck
}

Info.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const {result, checkResult, forchekResult, loading} = state.info;    
    return { result, checkResult, forchekResult, loading };    
}

export default connect(mapStateToProps, mapActionCreators)(Info)

