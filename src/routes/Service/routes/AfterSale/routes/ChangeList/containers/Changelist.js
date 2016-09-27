import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import ChangeListView from '../components/ChangeListView'
import Panel from 'components/Panel'
import {message} from 'hen';
import {getSearchList,getSearch } from '../modules/changeslist'


class ChangeView extends Component {
    constructor(props) {
        super(props);
        this.getFormOptions = this.getFormOptions.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.confirm = this.confirm.bind(this);        
        this.state = {
            newData: [],
            visible: false,
        }
    }
    
    componentDidMount() {
        const {getSearchList, location,params } = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        getSearchList(params)
    }
    getFormOptions() {
          const context = this;
          return {
            search(formObj){
                formObj && formObj.resetFields()
                context.setState({
                    visible: true,
                })
            },
            handleCancel() {
                context.setState({
                    visible: false,
                });
            }   
          }
      }
      confirm(id){
        const {tabelData} = this.props
        const context = this
        let tradesOrderList = tabelData[0].tradesOrderList
        let newObj = tradesOrderList && tradesOrderList.filter((item,index) => {
           return item.oid = id
        })
       if (newObj[0].isAfterSale = false) {
            setTimeout(() => {
                let pathname = '/service/aftersale/change/'+ newObj[0].oid + '/' + newObj[0].buyerNick ;
                context.context.router.replace(pathname);
            }, 100);
        } else {
            message.error('该订单已在退款或退货或换货中，不能重复申请售后服务！')
            
        }


    }
      handleOk (values,fresh) {
        const {getSearch,params} = this.props
        const context = this;
        getSearch(values).then(function(res) {
            if (res && res.data) {
                let data = []
                data.push(res.data)
                context.setState({
                    visible: false,
                    newData:data
                });
            } else {
                message.error('无查询结果')
               
            }
        })
    }
    render() {
        const {visible,newData} = this.state;
        const {tabelData, loading} = this.props;
        let dataResult = newData.length > 0 ? newData : tabelData
        const formOptions = {
            'formOptions' : this.getFormOptions()
        }
        return <Panel title="">
                    <ChangeListView {...formOptions} tabelData = {dataResult} visible = {visible} handleOk = {this.handleOk} confirm={this.confirm} />
                </Panel>
    }
}
ChangeView.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

const mapActionCreators = {
    getSearchList,
    getSearch
}
const mapStateToProps = (state) => {
    const {result, loading} = state.changeslist;
    let tabelData =[];
    tabelData.push(result);
    return {tabelData, loading };  
}
export default connect(mapStateToProps, mapActionCreators)(ChangeView)

