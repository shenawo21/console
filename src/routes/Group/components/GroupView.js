import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';

import Search from 'components/Search';
import Form from 'components/Form';
import {Row, Col, Button, Icon, Popconfirm,Modal} from 'hen';

class Group extends Component {

  //删除
  del(id) {
    const {delCategory} = this.props
    delCategory(id)
    //this.refs && this.refs.dt.refresh();
  }
  // 增加下级
  onhandNext(code,rate,refresh) {
      const {EditNext} = this.props;
      EditNext(code,rate,refresh);
  }
  // 编辑
  onhandEdit(id,refresh) {
      const {Edit} = this.props;
      Edit(id,refresh);
  }

   _getFormIModal(){
        let context = this;
        // const { } = context.props;
        let config = {
            formItems: [{
                label: "账号组名称：",
                name: "name",
                wrapperCol: { span: 10 },
                labelCol: { span: 5},
                rules: [{
                    validator(rule, value, callback) {
                        if (!value) {
                            callback(new Error('30个字符以内'));
                        } else {
                            callback();
                        }
                    }
                }],
                input: {
                    placeholder: "30个字符以内",
                }
            },{
                label: "上级账号组：",
                name: "next",
                wrapperCol: { span: 10 },
                labelCol: { span: 5},
                input: {
                }
            }],
            initValue: {
                name : null,
                next:null,
            }
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
      render(id,row) {
        const handNext = () => {
            context.onhandNext(row.categoryCode,row.commisRate);
        }
        const handEdit = () => {
            context.onhandEdit(row.id);
        }
        return <div>
          { row.level == 3 ? '' : <span><a onClick={handNext}>增加下级</a>&nbsp;&nbsp;|&nbsp;&nbsp;</span> }
          <a onClick={handEdit}>编辑</a>&nbsp;&nbsp;|&nbsp;&nbsp;
          <Popconfirm title="确定要删除此账号吗？" onConfirm={context.del.bind(context,id)}>
            <a href="#">删除</a>
          </Popconfirm>
        </div>;
      }
    }];
    return columns;
  }
   


  render() {
    const context = this;
    const {formOptions, dataSource, loading,handleOk,visible, ...other} = this.props;
    return (
      <div>
        <Row>
              <Col><Button onClick={(e)=>{
                  formOptions.showModal(this.refs.form)
              }} type="primary" style = {{marginBottom:15}} ><Icon type="plus-circle"/>新增顶级账号组</Button></Col>
        </Row>
        <Modal title="新增账号组"
                visible={visible}
                onOk={()=>{
                       this.refs.form && this.refs.form.validateFields((errors, values) => {
                        if (!!errors) {
                            console.log('Errors in form!!!');
                            return;
                        }
                        handleOk(values,this.refs.form);
                    });
                }}
                onCancel={formOptions.handleCancel} >
                <Form horizontal items={this._getFormIModal()} button={<span></span>} ref='form' />
            </Modal>
        <DataTable bordered={true} columns={this._getColumns()} ref='dt'{...other}  dataSource={dataSource} rowKey={record => record.categoryCode} > </DataTable>
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
