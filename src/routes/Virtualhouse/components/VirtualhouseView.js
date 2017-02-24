import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';

import Search from 'components/Search';
import {DownLoader} from 'components/FileLoader'
import {Row, Col, Button, Icon, Popconfirm, Modal} from 'hen';
import {getSpecValue,getPermissions} from 'common/utils'
// 商品来源
const STATUS = [
  {value: 0, title: "中台创建"},
  {value: 1, title: "商城采购"},
  {value: 2, title: "erp对接"}
];

class virtualView extends Component {

  constructor(props) {
      super(props)

      const url = location.hash.split('?')[0].split('#')[1]
      this.check = getPermissions(url)
  }

  //获取单条已出库存信息
  getAssignedStock(row) {
    const context = this;
    const id = row.skuId;
    const {handleModal} = context.props.tableOptions;
    handleModal.showModal(id);
  }

  _getFormItems() {
    let context = this;
    const {cateList} = context.props;
    let config = {
      formItems: [{
        label: "商品名称：",
        name: "title",
        labelCol: {span: 5},
        input: {
          placeholder: "请输入商品名称"
        }
      }, {
        label: "SPU：",
        name: "spuId",
        labelCol: {span: 5},
        input: {
          placeholder: "请输入SPU",
          type: 'number'
        }
      }, {
        label: "SKU：",
        name: "skuId",
        labelCol: {span: 5},
        input: {
          placeholder: "请输入SKU",
          type: 'number'
        }
      }, {
        label: "商品类目：",
        name: "categoryCode",
        wrapperCol: {span: 15},
        cascader: {
          options: cateList,
          placeholder: "请选择所属类目",
          changeOnSelect: true
        }
      },{
        label: "商品来源：",
        labelCol: {span: 5},
        name: "fromType",
        select: {
          placeholder: "请选择商品来源",
          optionValue: STATUS
        }
      }],
      initValue: {
        title: null,
        spuId: null,
        skuId: null,
        categoryCode: null,
        fromType:null
      }
    }
    return config;
  }


  _getColumns() {
    const context = this;

    let columns = [{
      key: '0',
      title: '平台SPU',
      dataIndex: 'spuId'
    }, {
      key: '1',
      title: '平台SKU',
      dataIndex: 'skuId'
    }, {
      key: '2',
      title: '商品名称',
      dataIndex: 'title'
    }, {
      key: '3',
      title: '商品类目',
      dataIndex: 'categoryName'
    }, {
      key:'4',
      title:'商品来源',
      dataIndex:'fromType',
      render(status){
        console.log(status,'------')
        let name = status == null ? status : STATUS[status].title
        return <span>{name}</span>
      }   
    },{
      key: '5',
      title: '规格',
      dataIndex: 'specOneValue',
      render(val, row){
        return getSpecValue(row)
      }
    }, {
      key: '6',
      title: '销售价',
      dataIndex: 'price'
    }, {
      key: '7',
      title: '采购价',
      dataIndex: 'purchasePrice'
    }, {
      key: '8',
      title: '已出库库存',
      dataIndex: 'assignedStock',
      render(value, row){
        return <a href="javascript:;" style={{textDecoration:'underline' }}
                  onClick={context.getAssignedStock.bind(context, row)}>{value}</a>
      }
    }, {
      key: '9',
      title: '可分配库存',
      dataIndex: 'stock'
    }
    /*, {
      key:'10',
      title: '操作',
      render(id, row) {
         const dels = () => {
              context.onDels(row.skuId,row.delStatus);
         }
         return <div>
                  {row.synStatus == 0 || row.skuSynStatus == 0 ? '' :
                      <span>
                        <Link to={`/virtualhouse/createProduct/${row.spuId}`}>编辑</Link>&nbsp; &nbsp; |&nbsp; &nbsp;
                        { row.delStatus == 0 ?
                          <Popconfirm title="确定要禁用此条数据？" onConfirm={dels} >
                              <a href="javascript:;" style = {{color:'red'}}>禁用</a>
                          </Popconfirm> :  
                          <Popconfirm title="确定要启用启用此条数据？" onConfirm={dels} >
                              <a href="javascript:;">启用</a>
                          </Popconfirm>
                        }
                       </span> 
                  }    
              </div>
      }
    }*/
    ];
    return columns;
  }

  _getStockColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: '店铺名称',
      dataIndex: 'shopName'
    }, {
      key: '1',
      title: '分配库存数',
      dataIndex: 'stock'
    }, {
      key: '2',
      title: '分配时间',
      dataIndex: 'createTime'
    }];
    return columns;
  }

  // 按钮
  quickButton(quickOptions) {
    const context = this;
    const {selectList, downParam} = context.props;
    if (downParam.pageNumber) {
      delete downParam.pageNumber
    }
    let params = selectList.length ? {skuIds: selectList || []} : downParam;
    return <Row>
      {this.check('批量导出') ? <Col span="3">
        <DownLoader title='批量导出' url="/api-productService.exportFile" params={params}/>
      </Col> : <span></span>}
      {this.check('入库') ? <Col span='2'>
        <Link className="ant-btn ant-btn-primary" to={`/virtualhouse/storageMgt`}>入库</Link>
      </Col> : <span></span>}
      {this.check('出库') ? <Col span='2'>
        <Link className="ant-btn ant-btn-primary" to={`/virtualhouse/outgoMgt`}>出库</Link>
      </Col> : <span></span>}
    </Row>
  }
  onDels(id,status,refresh) {
      const {delSubmit} = this.props
      const context = this
      delSubmit(id,status,context.refs.dt.refresh)
  }

  render() {
    const {formOptions, quickOptions, visible, tableOptions, stockTableOptions} = this.props;
    let {handleModal, ...other} = tableOptions;
    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>

        <DataTable bordered={true} columns={this._getColumns()} quickButton={this.quickButton(quickOptions)} {...other}
                   ref='dt'/>

        <Modal title="已出库明细" visible={visible} onOk={handleModal.handleOk} onCancel={handleModal.handleCancel}>
          <DataTable bordered={true} columns={this._getStockColumns()} {...stockTableOptions} />
        </Modal>


      </div>
    )
  }
}


virtualView.propTypes = {
  tableOptions: React.PropTypes.shape({
    dataSource: React.PropTypes.array,
    action: React.PropTypes.func,
    loading: React.PropTypes.bool
  }),
  stockTableOptions: React.PropTypes.shape({
    dataSource: React.PropTypes.array,
    loading: React.PropTypes.bool
  })
}


export default virtualView;
