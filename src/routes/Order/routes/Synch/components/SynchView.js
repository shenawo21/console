import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
//是否成功
const ISSUCC = {
  true: "成功",
  false: "失败"
};
import {Row, Col, Button, Icon, DatePicker} from 'hen';
class Synch extends Component {
  _getFormItems() {
    let context = this;
    const {shopList} = context.props;
    let config = {
      formItems: [{
        label: "选择店铺：",
        span: "5",
        labelCol: {span: 6},
        name: "shopId",
        select: {
          placeholder: "请选择所属店铺",
          optionValue: shopList
        }
      }, {
        label: "按日期查询：",
        span: '11',
        labelCol: {span: 4},
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div>
            <DatePicker format="yyyy-MM-dd HH:mm:ss" {...getCustomFieldProps('synStartTime') } showTime={true}/>
            <span className="ant-form-split">~</span>
            <DatePicker format="yyyy-MM-dd HH:mm:ss"  {...getCustomFieldProps('synEndTime') } showTime={true}/>
          </div>
        }
      }],
      initValue: {
        shopId: null,
        synStartTime: null,
        synEndTime: null
      }
    }
    return config;
  }

  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: 'ID',
      dataIndex: '_index',
      render(key){
        return <span>{key + 1}</span>;
      }
    }, {
      key: '1',
      title: '同步时间',
      dataIndex: 'createTime'
    }, {
      key: '2',
      title: '同步数量',
      dataIndex: 'num'
    }, {
      key: '3',
      title: '店铺',
      dataIndex: 'shopName'
    }, {
      key: '4',
      title: '同步结果',
      dataIndex: 'isSuccess',
      render(value){
        return value ? <span style={{color:'#0C3'}}>成功</span> : <span style={{color:'F00'}}>失败</span>
      }
    }, {
      key: '5',
      title: '操作人',
      dataIndex: 'createUser'
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
