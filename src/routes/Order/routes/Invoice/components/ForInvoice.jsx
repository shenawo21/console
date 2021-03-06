import React, {Component, PropTypes} from 'react';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
import {DownLoader} from 'components/FileLoader';
import {UpLoader} from 'components/FileLoader';
import {Row, Col, Button, Icon, DatePicker, Modal, message, Input, Table} from 'hen';
import {getPermissions} from 'common/utils'

const confirm = Modal.confirm;
//发票类型
const KIND = {
  '1': "电子发票",
  '2': "纸质发票"
};
class ForInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabDataSource: []
    }

    const url = location.hash.split('?')[0].split('#')[1]
    this.check = getPermissions(url)
  }
  _getFormItems() {
    let context = this, config = {};
    const { shopListItem,ListItem,chList} = context.props;
    config = {
      formItems: [{
        label: "选择店铺：",
        name: "shopId",
        span: "5",
        labelCol: {span: 6},
        select: {
          placeholder: "请选择所属店铺",
          optionValue: shopListItem
        }
      }, {
        label: "订单编号：",
        name: "tid",
        input: {
            placeholder: "请输入订单编号"
        }
      }, {
        label: "下单时间：",
        span: '11',
        labelCol: {span: 4},
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div>
            <DatePicker format="yyyy-MM-dd HH:mm:ss" {...getCustomFieldProps('createStartTime') } showTime={true}/>
            <p className="ant-form-split">~</p>
            <DatePicker format="yyyy-MM-dd HH:mm:ss"  {...getCustomFieldProps('createEndTime') } showTime={true}/>
          </div>
        }
      },{
        label: "所属渠道：",
        name: "channelCode",
        span: "5",
        labelCol: {span: 6},
        select: {
          placeholder: "请选择渠道编码",
          optionValue: chList
        }
      },
      // ,{
      //   label: "买家账号：",
      //   name: "buyerNick",
      //   span: "5",
      //   labelCol: {span: 6},
      //   input: {
      //       placeholder: "请输入买家帐号"
      //   }
      // },
      {
        label: "物流公司：",
        name: "companyCode",
        select: {
          placeholder: "请选择物流公司",
          optionValue: ListItem
        }
      },{
        label: "审单时间：",
        span: '11',
        labelCol: {span: 4},
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div><DatePicker format="yyyy-MM-dd HH:mm:ss" {...getCustomFieldProps('reviewStartTime') }
                                  showTime={true}/>
            <p className="ant-form-split">~</p>
            <DatePicker format="yyyy-MM-dd HH:mm:ss"  {...getCustomFieldProps('reviewEndTime') } showTime={true}/>
          </div>
        }
      }],
      initValue: {
        shopId: null,
        tid: null,
        buyerNick: null,
        createStartTime: null,
        createEndTime: null,
        reviewStartTime: null,
        reviewEndTime: null,
        companyCode:null,
        channelCode:null
      }
    }
    return config;
  }

  _getColumns() {
    const context = this;
    const {items} = context.props;
    let columns = [{
      key: '0',
      title: '店铺名称',
      dataIndex: 'name'
    }, {
      key: '1',
      title: '发货单号',
      dataIndex: 'shoppId',
      width: 80
    }, {
      key: '2',
      title: '审单时间',
      dataIndex: 'auditTime'
    }, {
      key: '3',
      title: '包含订单',
      dataIndex: 'tids'
    }, {
      key: '4',
      title: '商品数量',
      dataIndex: 'quantity',
      width: 80
    }, {
      key: '5',
      title: '客服备注',
      dataIndex: 'remark'
    },{
      key: '6',
      title: '所属渠道',
      dataIndex: 'channelName'
    }, {
      key: '7',
      title: '物流公司',
      dataIndex: 'companyName',
      width: 80
    }, {
      key: '8',
      title: '运单号',
      dataIndex: 'outSid',
      render(value, row){
        return <Input placeholder="运单号" name='outSid' onChange={(e) => {
                if (!(/^[a-zA-Z0-9]{1,32}$/.test(e.target.value))) {
                  message.warning('请输入32位以内的运单号');
                  e.target.value='';
                  return false
                }
                items.forEach((val,index)=>{
                    if(row.shoppId==val.shoppId){
                      items[index].outSid = e.target.value
                    }
                })
                context.setState({
                  tabDataSource:items
                })
        }}/>
      },
      width: 200
    }, {
      title: '操作',
      dataIndex: 'shopId',
      render:(id, row) => {
        return <span>{this.check('打单发货') ? <Button type="primary" onClick={context.showGive.bind(context,row)}>确认发货</Button> : ''}</span>
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
      dataIndex: 'tid'
    }, {
      key: '1',
      title: '商品编码',
      dataIndex: 'outerSkuId'
    }, {
      key: '2',
      title: '商品名称',
      dataIndex: 'title'
    }, {
      key: '3',
      title: '销售价',
      dataIndex: 'sales'
    }, {
      key: '4',
      title: '数量',
      dataIndex: 'num'
    }, {
      key: '5',
      title: '总金额',
      dataIndex: 'payment'
    }, {
      key: '6',
      title: '发票要求',
      dataIndex: 'invoiceKind',
      render(key){
        return <span>{key ? KIND[key] : '不开发票'}</span>
      }
    }];
    return columns;
  }
  /**
   * 单个发货
   * @param row
   * @returns {boolean}
   */
  showGive(row) {
    const context = this;
    const {isGive} = context.props.tableOptions;
    confirm({
      title: '发货确认',
      content: '你确定发货？',
      onOk() {
        if (row.outSid == null) {
          message.warning('运单号不能为空');
          return false;
        } else {
          isGive(row);
          //context.refs && context.refs.dt.refresh();
        }
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
    const {isGiveM} = context.props.tableOptions;
    const {selectList} = context.props;
    const {tabDataSource} = context.state
    let newArray = []
    confirm({
      title: '发货确认',
      content: '你确定批量发货？',
      onOk() {
        tabDataSource && tabDataSource.forEach((val,num) => {
            selectList.every((item,index) => {     
              if (val.shoppId == item.shoppId) {
                  item.outSid = val.outSid
               }
              newArray[index] = {...item}
              return true
            })            
          })
          if (newArray.length) {
              let dataNull = newArray && newArray.filter((item,index) => {
                return item.outSid == null
              })
              
              if (dataNull.length) {
                 message.info('勾选订单运单号不能为空！')
              } else {
                  isGiveM(newArray)
              }
          } else {
            message.info('勾选订单运单号不能为空！')
          }
      },
      onCancel() {
      }
    });
  }

  _refresh() {
    this.refs.dt.refresh();
  }


  quickButton(quickOptions) {
    let context = this;
    const { selectList, downParam }=context.props;
    let dParams = selectList.length && selectList.map((s)=> {
      return s.shoppId
    })
    // let params = {
    //   shoppId: dParams
    // }
    if (downParam.pageNumber) {
      delete downParam.pageNumber
    }
    let params = selectList.length ? {shoppId: dParams || []} : downParam;
    return <Row>
      {this.check('导出待发货数据') ? <Col span="3">
        <DownLoader url='/api-tradesInfo.exportWaitSendGoods' params={params} title='导出待发货数据'/>
      </Col> : <span></span>}
      {this.check('导入待发货数据') ? <Col span="3">
        <UpLoader upConfig={{action: '/api-tradesInfo.importWaitSendGoods', onChangeFileList(info){
                Modal.info({
                  title: '导入结果',
                  content: <div>
                            <p>成功：{info[0].success} 条</p>
                            <p>失败：{info[0].fail} 条</p>
                          </div>
                });
                context._refresh();
            }}} title='导入待发货数据'/>
      </Col> : <span></span>}
    </Row>
  }
   shouldComponentUpdate (nextProps, nextState) {
        if(nextProps.tableOptions.key == 1) {
          return false;
        }
        return true;
    }
  render() {
    const {formOptions, tableOptions, quickOptions, hasSelected, loading, items, ...other} = this.props;
    let { dataSource } = tableOptions;
    dataSource && dataSource.forEach((val, index)=> {
      val.key = index;
      val.shoppDetails && val.shoppDetails.forEach((val, index) => {
        val.key = index
      })
    })

    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>

        <DataTable _uKey='orderId' bordered={true} columns={this._getColumns()} ref='dt'
                   quickButton={this.quickButton(quickOptions)} {...tableOptions} className="table"
                   expandedRowRender={record => <Table rowKey={record => record.orderId} size="small" columns={this._customColumns()} dataSource={record.shoppDetails} bordered pagination={false} />}/>
        {this.check('打单发货') ? <div style={{ marginTop: 16 }}>
          <Button type="primary" loading={loading} disabled={!hasSelected}
                  onClick={this.showGiveM.bind(this)}>
            批量发货
          </Button>
        </div> : ''}
      </div>
    )
  }
}

ForInvoice.propTypes = {
  dataSource: React.PropTypes.array.isRequired,
  action: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default ForInvoice;


