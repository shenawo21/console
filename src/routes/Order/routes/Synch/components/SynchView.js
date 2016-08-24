import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';


import Search from 'components/Search';

import {Row, Col, Button, Icon,DatePicker } from 'hen';

const STATUS = [
  { value: false, title: "所有店铺" },
  { value: true, title: "天猫" }
];
class Synch extends Component {

  _getFormItems() {
    let config = {
      formItems: [{
        label: "选择店铺：",
        span:'5',
        name: "name1",
        select: {
          placeholder: "请选择所属店铺",
          optionValue: STATUS
        }
      }, {
        label:"按日期查询：",
        span : "10",
        labelCol:{span: 4},
        wrapperCol:{span:19},
        custom(getCustomFieldProps, FormContext){
          return <div>
            <Col span="11">
              <DatePicker format="yyyy-MM-dd HH:mm:ss" {...getCustomFieldProps('createTimeStart') } showTime={true} />
            </Col>
            <Col span="2">
              <p className="ant-form-split">~</p>
            </Col>
            <Col span="11">
              <DatePicker format="yyyy-MM-dd HH:mm:ss"  {...getCustomFieldProps('createTimeEnd') } showTime={true}/>
            </Col>
          </div>
        }
      }],
      initValue: {
        name1: null,
        name2: null
      }
    }
    return config;
  }

  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: 'ID',
      dataIndex: '字段0'
    }, {
      key: '1',
      title: '同步时间',
      dataIndex: '字段1'
    }, {
      key: '2',
      title: '同步数量',
      dataIndex: '字段2'
    }, {
      key: '3',
      title: '店铺',
      dataIndex: '字段3'
    }, {
      key: '4',
      title: '同步结果',
      dataIndex: '字段4'
    }, {
      key: '5',
      title: '操作者',
      dataIndex: '字段5'
    }];
    return columns;
  }


  quickButton(quickOptions) {
    return <Row>
      <Col span='2'>
        <Link to={`/order/synch/manual`}>
          <Button type="primary"><Icon type="plus-circle"/>订单人工同步</Button>
        </Link>
      </Col>
    </Row>
  }

  render() {
    const {formOptions, quickOptions, ...other} = this.props;

    return (
      <div>

        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>


        <DataTable bordered={true} columns={this._getColumns()}
                   quickButton={this.quickButton(quickOptions)} {...other} />

      </div>
    )
  }
}


Synch.propTypes = {

  dataSource: React.PropTypes.array.isRequired,
  action: React.PropTypes.func.isRequired,

  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default Synch;
