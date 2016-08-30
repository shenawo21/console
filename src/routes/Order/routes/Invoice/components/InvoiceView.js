import React, {Component, PropTypes} from 'react';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
import {DownLoader} from 'components/FileLoader';
import {UpLoader} from 'components/FileLoader';
import {Row, Col, Button, Icon, DatePicker, Modal, message} from 'hen';
const confirm = Modal.confirm;
class Audit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      outNumber: []
    }
  }

  _getFormItems() {
    let context = this, config = {};
    const {shopList} = context.props;
    config = {
      formItems: [{
        label: "选择店铺：",
        name: "shopId",
        span: "5",
        labelCol: {span: 6},
        select: {
          placeholder: "请选择所属店铺",
          optionValue: shopList
        }
      }, {
        label: "订单编号：",
        name: "tId",
        span: "5",
        labelCol: {span: 8},
        input: {}
      }, {
        label: "下单时间：",
        span: "13",
        labelCol: {span: 5},
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div>
            <Col span="8">
              <DatePicker format="yyyy-MM-dd HH:mm:ss" {...getCustomFieldProps('createStartTime') } showTime={true}/>
            </Col>
            <Col span="3">
              <p className="ant-form-split">~</p>
            </Col>
            <Col span="8">
              <DatePicker format="yyyy-MM-dd HH:mm:ss"  {...getCustomFieldProps('createEndTime') } showTime={true}/>
            </Col>
          </div>
        }
      }, {
        label: "买家账号：",
        name: "buyerNick",
        span: "5",
        labelCol: {span: 6},
        input: {}
      }, {
        label: "审单时间：",
        span: "13",
        labelCol: {span: 3},
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div>
            <Col span="8">
              <DatePicker format="yyyy-MM-dd HH:mm:ss" {...getCustomFieldProps('reviewStartTime') } showTime={true}/>
            </Col>
            <Col span="3">
              <p className="ant-form-split">~</p>
            </Col>
            <Col span="8">
              <DatePicker format="yyyy-MM-dd HH:mm:ss"  {...getCustomFieldProps('reviewEndTime') } showTime={true}/>
            </Col>
          </div>
        }
      }],
      initValue: {
        shopId: null,
        tId: null,
        buyerNick: null,
        createStartTime: null,
        createEndTime: null,
        synStartTime: null,
        synEndTime: null
      }
    }
    return config;
  }

  /**
   * 单个发货
   * @param row
   * @returns {boolean}
   */
  showGive(row) {
    const context = this;
    const {isGive} = context.props;
    const {outNumber} = context.state;
    if (outNumber == null) {
      message.warn('运单号不能为空');
      return false;
    }
    confirm({
      title: '发货确认',
      content: '你确定发货？',
      onOk() {
        console.log(row);
        isGive({
          List: {
            shoppId: row.row,
            outSid: outNumber
          }
        });
        context.refs && context.refs.dt.refresh();
      },
      onCancel() {
      }
    });
  }

  /**
   * 批量发货
   * @param row
   */
  showGiveM(row) {
    const context = this;
    confirm({
      title: '发货确认',
      content: '你确定批量发货？',
      onOk() {
        console.log(row);
        context.refs && context.refs.dt.refresh();
      },
      onCancel() {
      }
    });
  }

  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: '店铺名称',
      dataIndex: 'shopName'
    }, {
      key: '1',
      title: '发货单号',
      dataIndex: 'shoppId'
    }, {
      key: '2',
      title: '审单时间',
      dataIndex: 'reviewTime'
    }, {
      key: '3',
      title: '包含订单',
      dataIndex: 'orderIdS'
    }, {
      key: '4',
      title: '商品数量',
      dataIndex: 'quantity'
    }, {
      key: '5',
      title: '客服备注',
      dataIndex: 'remark'
    }, {
      key: '6',
      title: '物流公司',
      dataIndex: 'companyName'
    }, {
      key: '7',
      title: '运单号',
      dataIndex: 'outSid',
      render(value){
        return <Input placeholder="运单号" name='outSid' onChange={(e) => {
                    context.setState({
                        outNumber: e.target.value
                    })
                }} defaultValue={value}/>
      },
      width: 100
    }, {
      title: '操作',
      dataIndex: 'shopId',
      render(id, row){
        return <Button type="primary" onClick={context.showGive.bind(context,row)}>确认发货</Button>
      }
    }];
    return columns;
  }

  /**
   * 自定义表格title
   * @returns {*[]}
   * @private
   */
  _customColumns() {
    let columns = [{
      key: '0',
      title: '订单编号',
      dataIndex: 'orderId'
    }, {
      key: '1',
      title: '商品编码',
      dataIndex: 'skuId'
    }, {
      key: '2',
      title: '商品名称',
      dataIndex: 'title'
    }, {
      key: '3',
      title: '销售价',
      dataIndex: 'price'
    }, {
      key: '4',
      title: '数量',
      dataIndex: 'quantity'
    }, {
      key: '5',
      title: '总金额',
      dataIndex: 'totalPrice'
    }, {
      key: '6',
      title: '发票要求',
      dataIndex: 'invoiceType'
    }];
    return columns;
  }

  _refresh() {
    this.refs.dt.refresh();
  }

  quickButton(quickOptions) {
    let context = this;
    return <Row>
      <Col span="3">
        <DownLoader url='/api-tradesInfo.exportWaitSendGoods' title='导出待发货数据'/>
      </Col>
      <Col span="3">
        <UpLoader upConfig={{action: '/api-tradesInfo.importWaitSendGoods', onChangeFileList(){
                context._refresh();
            }}} title='导入待发货数据'/>
      </Col>
    </Row>
  }

  render() {
    const {formOptions, quickOptions, ...other, hasSelected, loading, items} = this.props;
    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>

        <DataTable bordered={true} columns={this._getColumns()} ref='dt'
                   quickButton={this.quickButton(quickOptions)} {...other} className="table"
                   expandedRowRender={record => items.skuInfo ? <Table columns={this._customColumns()} dataSource={items.skuInfo} bordered />:'暂无数据'}/>
        <div style={{ marginTop: 16 }}>
          <Button type="primary" loading={loading} disabled={!hasSelected}
                  onClick={this.showGiveM.bind(this)}>
            批量发货
          </Button>
        </div>
      </div>
    )
  }
}

Audit.propTypes = {

  dataSource: React.PropTypes.array.isRequired,
  action: React.PropTypes.func.isRequired,

  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default Audit;
