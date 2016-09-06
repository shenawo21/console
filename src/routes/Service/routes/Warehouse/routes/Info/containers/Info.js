import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import InfoView from '../components/InfoView'
import Panel from 'components/Panel'
import {view, viewForcheck, getLogisticsList, doCheck} from '../modules/InfoReducer'

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
        const {view, viewForcheck, getLogisticsList, params} = this.props;
        //获取详情信息
        if(params.skuid != 1){
            viewForcheck({
                tid: params.id,
                outerSkuId: params.skuid
            });            
        }else{
            view({refundId:params.id});
        }
        //获取物流公司列表
        getLogisticsList();   
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
                  const { doCheck } = _this.props;
                  console.log(value,'value');          
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
        const {logisticResult, items, params, loading} = this.props;        
        const formOptions = {
            ...this.getFormOptions()
        }
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            loading                                     //表格加载数据状态
        }

        /**
         * 快递列表
         * @param lists
         * @returns {*}
         */
        let logiListItem = [];
        if (logisticResult) {
            logiListItem = logisticResult.map(c=> {
            return {
                value: c.companyCode,
                title: c.companyName
           }
        });
        } else { 
            logiListItem = [{
                value: null,
                title: '正在加载中...'
            }]
        }

        return <Panel title="验收详情"><InfoView item={item} params={params} photoList={photoList} formOptions={formOptions} tableOptions={tableOptions} logiListItem={logiListItem} /></Panel>
    }
}

Info.propTypes = {    
    doCheck: React.PropTypes.func,
    view: React.PropTypes.func,
    viewForcheck: React.PropTypes.func,
    getLogisticsList: React.PropTypes.func,
    items: React.PropTypes.array.isRequired,
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    view,
    viewForcheck,
    getLogisticsList,
    doCheck
}

Info.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const {result, checkResult, forchekResult, logisticResult, loading} = state.info;
    const items = [];
    forchekResult && items.push(forchekResult)
    return { items, result, checkResult, forchekResult, logisticResult, loading };    
}

export default connect(mapStateToProps, mapActionCreators)(Info)

