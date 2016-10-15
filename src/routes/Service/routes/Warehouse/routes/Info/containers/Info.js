import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import InfoView from '../components/InfoView'
import Panel from 'components/Panel'
import {view, viewForcheck, getLogisticsList, doCheck} from '../modules/InfoReducer'
import {message} from 'hen'

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

        if (!nextProps.params.skuid == 1) {
            this.setState({
                item: {},
                photoList: []
            })
        } else {
            this.setState({
                item: nextProps.forchekResult,
                // photoList: nextProps.viewResult ? nextProps.viewResult.photo : []
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
                  const { doCheck,forchekResult } = _this.props;
                  let goodList = _this.refs.info.state.goodList[0];
                  if (_this.state.photoList) {
                            value.checkPics = (typeof _this.state.photoList) === 'string' ? _this.state.photoList : _this.state.photoList.length ? _this.state.photoList[0].name : '';
                      }
                  value.refundId = forchekResult.refundId
                  let num = _this.refs.info.state.goodList.length > 0 ? _this.refs.info.state.goodList[0].realAmount : ''
                  let reason = _this.refs.info.state.goodList.length > 0 ? _this.refs.info.state.goodList[0].checkResult : ''
                  value.realAmount = num
                  value.checkResult = reason
                  if(!value.realAmount) {
                      message.error('请输入商品实际数量！')
                  } else if (!value.checkResult) {
                      message.error('请输入验收结果！')
                  } else {
                      doCheck({
                        ...goodList,
                        ...value
                    }).then(function(response) {
                        if (response && response.status == 1) {
                            setTimeout(() => {
                                let pathname = '/service/warehouse';
                                _this.context.router.replace(pathname);
                            }, 1000);
                        }
                    })
                  }
                  
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
        const {logisticResult, forchekResult, viewResult, params, loading} = this.props;
        const formOptions = {
            ...this.getFormOptions()
        }
        const items = [];
        if(params.skuid != 1){
            forchekResult && items.push(forchekResult) || []
        }else{
            viewResult && items.push(viewResult) || [];
        }      
        const tableOptions = {
            dataSource : items,                          //加载组件时，表格从容器里获取初始值
            loading                                      //表格加载数据状态
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

        return <Panel title="验收详情"><InfoView item={item} viewResult = {viewResult} params={params} photoList={photoList} ref="info" photoImg={this.photoImg} formOptions={formOptions} tableOptions={tableOptions} logiListItem={logiListItem} /></Panel>
    }
}

Info.propTypes = {    
    doCheck: React.PropTypes.func,
    view: React.PropTypes.func,
    viewForcheck: React.PropTypes.func,
    getLogisticsList: React.PropTypes.func,
    items: React.PropTypes.array,
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
    const {viewResult, checkResult, forchekResult, logisticResult, loading} = state.info;
    return { viewResult, checkResult, forchekResult, logisticResult, loading };    
}

export default connect(mapStateToProps, mapActionCreators)(Info)

