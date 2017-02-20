import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import AccountsView from '../components/AccountsView'
import Panel from 'components/Panel';
import store from 'store2';
import {message} from 'hen';
import {queryList, addItem, modifyItem, deleteItem,group,restPswd} from '../modules/AccountsReducer'

class Accounts extends Component {
  
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this);

        this.resetPsw = this.resetPsw.bind(this)
        
        this.state = {
            isAdmin: false,
            params: {}   //表格需要的筛选参数
        }
    }
    
     /**
     * (删除账户)
     * @params id
     */
    _delAccount(id){
        const ids = [];
        const {deleteItem} = this.props;
        ids.push(id);
        deleteItem({adminIds: ids});
    }
    
    componentDidMount() {
        
        const {queryList, location,group} = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        queryList({ pageNumber });
        // 获取账号组列表
        group()

        this.setState({
            isAdmin: store.get('USER').admin
        });
        
    }
    
      /**
       * (表格功能配置项)
       * 
       * @returns (description)
       */
      getFormOptions() {
          const context = this;
          return {
              /**
               * (筛选表单提交)
               * 
               * @param value (description)
               */
              handleSubmit(value) {
                  value.deptCode = value.deptCode ? value.deptCode.join(',') : ''
                  context.setState({
                      params: value
                  })
              },

              /**
               * (筛选表单重置)
               */
              handleReset() {
              }
          }
      }
    //   重置密码
    resetPsw(id) {
        const {restPswd} = this.props
        restPswd(id).then(function(res) {
            if(res.status == 1) {
                message.success('密码已重置，当前账号的密码重置为初始密码"123456"',3)
            }
        })
    }
    
    
    render() {
        const {params, isAdmin} = this.state;
        
        const {items, queryList, totalItems, loading,groupResult} = this.props;
        console.log(items,'/////')
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : queryList,                         //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems                      //数据总数
            },  
            loading,                                    //表格加载数据状态
            params,                                     //表格检索数据参数
            del: this._delAccount.bind(this),                   //删除账户             
        }
        
        // 账号组列表
        const loop = (groupResult) => {
            return groupResult && groupResult.map(a => {
                let children = loop(a.children)

                if (children) {
                    return {
                        value: a.deptCode,
                        label: a.name,
                        children
                    }
                } else {
                    return {
                        value: a.deptCode,
                        label: a.name
                    }
                }
            })
        }
        const formOptions = {
            'formOptions' : this.getFormOptions()
        }
        
        
        return <Panel title=""><AccountsView  isAdmin={isAdmin} groupList = {loop(groupResult)} resetPsw = {this.resetPsw} {...tableOptions} {...formOptions} /></Panel>
    }
}


Accounts.propTypes = {
    
    queryList: React.PropTypes.func,
    items: React.PropTypes.array.isRequired,
    totalItems: React.PropTypes.number.isRequired,
    
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    queryList,
    deleteItem,
    group,
    restPswd
}


const mapStateToProps = (state) => {
    const {result, loading,groupResult} = state.accounts;
    
    const {items = [], totalItems = 0} = result || {};
    return { items, totalItems, loading,groupResult};
    
}

export default connect(mapStateToProps, mapActionCreators)(Accounts)

