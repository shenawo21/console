import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {getPermissions} from 'common/utils'

import DataTable from 'components/DataTable';

import Search from 'components/Search';
import Form from 'components/Form';
import {Row, Col, Button, Icon, Popconfirm,Modal} from 'hen';

class Group extends Component {
  constructor(props) {
    super(props);
    this.addTop = this.addTop.bind(this)
    this.state = {
        eidtId:false,
        editName:''
    }
    const url = location.hash.split('?')[0].split('#')[1]
    this.check = getPermissions(url)
  }
  //删除
  del(id) {
    const {delCategory} = this.props
    delCategory(id)
  }
 //新增顶级
  addTop(refresh) {
      const {addOnTop} = this.props;
      addOnTop(this.refs.form)
     this.setState({ eidtId:true,editName:''})
  }
  // 增加下级
  onhandNext(name,code,refresh) {
      const {EditNext} = this.props;
      EditNext(name,code,refresh);
      this.setState({ eidtId:false})
  }
  // 编辑
  onhandEdit(name,code,refresh) {
      const {Edit} = this.props;
      Edit(name,code,refresh);
      this.setState({eidtId:true,editName:name})
  }

   _getFormIModal(){
        let config = {}, context = this;
        const {preName} = context.props;
        const {eidtId,editName} = context.state
        config.formItems = [{
            label: "账号组名称：",
            name: "name",
            wrapperCol: { span: 10 },
            labelCol: { span: 5},
           rules: [{
                validator(rule, value, callback) {
                    if (!value) {
                        callback(new Error('请输入32个字符以内的名称'));
                    } else if(value.length > 32){
                        callback(new Error('名称长度不大于32个字符'));
                    } else {
                        callback();
                    }
                }
            }],
            input: {
                placeholder: "32个字符以内",
            }
        },{
            label: "上级账号组：",
            name: "nextName",
            disabled:true,
            wrapperCol: { span: 10 },
            labelCol: { span: 5},
            input: {
            }
        }];
        config.initValue = {
            'name' : null,
            'nextName':null || preName,
        }
         if (eidtId == true) {
            config.formItems.splice(1, 1);
            config.initValue.name = editName
        }
     return config;       
    }

  _getColumns() {
    const context = this;
    let columns = [{
      title: '账号组',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '操作',
      dataIndex: 'categoryCode',
      width: '16%',
      render:(id,row) => {
        const handNext = () => {
            context.onhandNext(row.name,row.deptCode,context.refs.form);
        }
        const handEdit = () => {
            context.onhandEdit(row.name,row.deptCode,context.refs.form);
        }
        return <div>
          { row.level == 6 ? '' : (this.check('增加下级') ? <span><a onClick={handNext}>增加下级</a>&nbsp;&nbsp;|&nbsp;&nbsp;</span> : '') }
          {this.check('编辑') ? <span><a onClick={handEdit}>编辑</a>&nbsp;&nbsp;|&nbsp;&nbsp;</span> : ''}
          {this.check('删除') ? <Popconfirm title="确定要删除此账号组吗？" onConfirm={context.del.bind(context,row.deptCode)}>
            <a href="#">删除</a>
          </Popconfirm> : ''}
        </div>;
      }
    }];
    return columns;
  }
  render() {
    const context = this;
    const {formOptions, dataSource, loading,handleOk,visible,title, ...other} = this.props;
    const {editName} = this.state
    let disabled = dataSource && dataSource.length
    return (
      <div>
        <Row>
              <Col><Button onClick={this.addTop} disabled = {disabled} type="primary" style = {{marginBottom:15}} ><Icon type="plus-circle"/>新增顶级账号组</Button></Col>
        </Row>
        <Modal title={title}
                visible={visible}
                onOk={()=>{
                       this.refs.form && this.refs.form.validateFields((errors, values) => {
                        if (!!errors) {
                            console.log('Errors in form!!!');
                            return;
                        }
                        handleOk(values,this.refs.form,editName);
                    });
                }}
                onCancel={formOptions.handleCancel} >
                <Form horizontal items={this._getFormIModal()} button={<span></span>} ref='form' />
            </Modal>
        <DataTable bordered={true} columns={this._getColumns()} ref='dt'{...other}  dataSource={dataSource} rowKey={record => record.deptCode} > </DataTable>
      </div>
    )
  }
}


Group.propTypes = {

  dataSource: React.PropTypes.array,
  action: React.PropTypes.func.isRequired,

  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default Group;
