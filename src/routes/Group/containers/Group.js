import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import GroupyView from '../components/GroupView'
import Panel from 'components/Panel'
import {queryList, deleteItem} from '../modules/GroupReducer'
import {message} from 'hen'
class Group extends Component {

  constructor(props) {
    super(props);
    this.Edit = this.Edit.bind(this);
    this.EditNext = this.EditNext.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.state = {
      visible: false,
    }
  }

  //删除
  delCategory(id) {
    const context = this;
    const {deleteItem} = this.props;
    deleteItem({categoryCode: id.split(",")}).then((res) => {
      if(res && res.status == 1) {
        message.success(res.message);
        setTimeout(() => {
          context.refs.cateTable.refs.dt.refresh();
        },600)
      }else{
        message.error(res.message);
      }
    });
  }
  componentDidMount() {
    const {queryList} = this.props;
    queryList();
  }
  getFormOptions() {
        const context = this;
        return {
            showModal(formObj){
                formObj && formObj.resetFields()
                context.setState({
                    visible: true,
                    // id:'',
                    // addressItemState : {}
                })
            },
            handleCancel() {
                context.setState({
                    visible: false,
                });
            }
        }
  }
  // 增加下级
  EditNext(id,refresh) {
      const context = this;
      context.setState({
          visible: true,
      })
      // refresh ? refresh.resetFields() : ''
      // const {gitAddressItem} = this.props
      // gitAddressItem({id:id}).then(function(res) {
      //     context.setState({
      //         visible: true,
      //         id:id
      //     })
      // })        
  }
  // 编辑
  Edit(id,refresh) {
      const context = this;
      context.setState({
          visible: true,
      })
      // refresh ? refresh.resetFields() : ''
      // const {gitAddressItem} = this.props
      // gitAddressItem({id:id}).then(function(res) {
      //     context.setState({
      //         visible: true,
      //         id:id
      //     })
      // })        
  }
  handleOk (values,fresh) {
    console.log(values,'values')
      // const self = this
      // const {id} = this.state
      // const {addAddress,editAddress,gitAddressList} = this.props
      // const addArray = values.address
      // values.receiverState = addArray[0] ? addArray[0] : ''
      // values.receiverCity = addArray[1] ? addArray[1] : ''
      // values.receiverDistrict = addArray[2] ? addArray[2] : ''
      // delete values.address
      // if (id) {
      //     values = {...values,id:id}
      //     editAddress(values).then(function(res) {
      //         if (res && res.status == 1) {
      //             self.setState({visible: false})
      //             fresh && fresh.resetFields()
      //             gitAddressList()
      //         } else {
      //             message.error(res.message, 1)
      //         }
              
      //     })
      // } else {
      //     addAddress(values).then(function(res) {
      //         if (res && res.status == 1) {
      //             self.setState({visible: false})
      //             fresh && fresh.resetFields()
      //             gitAddressList()
      //         } else {
      //             message.error(res.message, 1)
      //         }    
      //     })
      // }
  }
  render() {
    const {result, queryList, loading} = this.props;
    const {visible} = this.state;
    const loop = (lists) => {

      return lists && lists.map(a => {
          a.children && a.children.length > 0 ? loop(a.children) : delete a.children;
          return a; 
        })
    }
    const tableOptions = {
      action: queryList,
      dataSource: loop(result),                   //加载组件时，表格从容器里获取初始值
      loading,                                    //表格加载数据状态
      delCategory: this.delCategory.bind(this),
    }

    return <Panel title=""><GroupyView 
                                {...tableOptions} 
                                ref="cateTable"
                                visible = {visible}
                                formOptions={this.getFormOptions()}
                                handleOk = {this.handleOk}
                                Edit = {this.Edit}
                                EditNext = {this.EditNext} 
                                /></Panel>
  }
}

Group.propTypes = {
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  queryList,
  deleteItem
}

const mapStateToProps = (state) => {
  const {result, delResult, jump, loading} = state.accountgroup;
  return {result, delResult, jump, loading};
}

export default connect(mapStateToProps, mapActionCreators)(Group)

