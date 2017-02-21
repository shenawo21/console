import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import GroupyView from '../components/GroupView'
import Panel from 'components/Panel'
import {queryList,addItem, deleteItem,editItem} from '../modules/GroupReducer'
import {message} from 'hen'
class Group extends Component {

  constructor(props) {
    super(props);
    this.Edit = this.Edit.bind(this);
    this.EditNext = this.EditNext.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.addOnTop = this.addOnTop.bind(this);
    this.state = {
      visible: false,
      title:'新增账号组',
      preName:'',
      preCode:'',
      editName:'',
      editCode:'',
      edit:false
    }
  }
  
  //删除
  delCategory(id) {
    const context = this;
    const {deleteItem} = this.props;
    deleteItem({deptCode:id}).then((res) => {
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
            // showModal(formObj){
            //     formObj && formObj.resetFields()
            //     context.setState({
            //         visible: true,
            //         // id:'',
            //     })
            // },
            handleCancel() {
                context.setState({
                    visible: false,
                });
            }
        }
  }
  // 新增顶级
  addOnTop (refresh) {
    refresh ? refresh.resetFields() : ''
    const context = this;
    context.setState({
          visible: true,
          title:'新增账号组',
          edit:false,
          preCode:''
      })  
  }
  // 增加下级
  EditNext(name,code,refresh) {
     refresh ? refresh.resetFields() : ''
      const context = this;
      context.setState({
          visible: true,
          title:'新增账号组',
          preName:name,
          preCode:code,
          edit:false
      })  
  }
  // 编辑
  Edit(name,code,refresh) {
      refresh ? refresh.resetFields() : ''
      const context = this;
      context.setState({
          visible: true,
          title:'编辑账号组',
          editCode:code,
          edit:true
      })
  }
  handleOk (values,fresh,editName) {
    const self = this;
    const {addItem,queryList,editItem} = self.props
    const {preCode,edit,editCode} = self.state
    if (edit == true) {
        let value = {...values,deptCode:editCode}
        if(editName != values.name) {
          editItem(value).then(function(res) {
            if (res && res.status == 1) {
                  self.setState({visible: false})
                  fresh && fresh.resetFields()
                  queryList()
              } else {
                  message.error(res.message, 1)
              }
          })
        } else {
          self.setState({visible: false})
        }
    } else {
        delete values.nextName
        let value = {...values,deptCode:preCode}
        addItem(value).then(function(res) {
          if (res && res.status == 1) {
                self.setState({visible: false})
                fresh && fresh.resetFields()
                queryList()
            } else {
                message.error(res.message, 1)
            }
        })
    }
  }
  render() {
    const {result, queryList, loading} = this.props;
    const {visible,preName,title} = this.state;
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
                                title = {title}
                                preName = {preName}
                                formOptions={this.getFormOptions()}
                                addOnTop = {this.addOnTop}
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
  addItem,
  deleteItem,
  editItem
}

const mapStateToProps = (state) => {
  const {result, delResult, jump, loading} = state.accountgroup;
  return {result, delResult, jump, loading};
}

export default connect(mapStateToProps, mapActionCreators)(Group)

