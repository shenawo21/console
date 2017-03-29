import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import Collapse from 'components/Collapse';
import DataTable from 'components/DataTable';
import {message, Modal, Input, InputNumber} from 'hen'
import {getSpecValue,getPermissions} from 'common/utils'
import {DownLoader} from 'components/FileLoader'
import classes from './Product.less';
class product extends Component {

    constructor(props) {
        super(props)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleOkMessage = this.handleOkMessage.bind(this)
        this.state = {
            selectItems: [],            //选中数据列表 selectItems[curIndex]
            visible : false,            //modal框是否可见
            resultVisible : false,      //对比更新处理结果显示
            messageDataSource: [],      //对比更新处理结果
            curIndex : null,            //处理当前表格下标
            remark : null,              //回复信息
            selectedItemsKeys : []      //选中下标
        }

        const url = location.hash.split('?')[0].split('#')[1]
        this.check = getPermissions(url)
    }

    _getColumns() {
        const context = this;
        let columns = [{
            key: '0',
            title: 'SPU',
            dataIndex: 'spuId'
        }, {
            key: '1',
            title: 'SKU',
            dataIndex: 'skuId'
        }, {
            key: '2',
            title: '所属店铺',
            dataIndex: 'relevantStoreName'
        }, {
            key: '3',
            title: '商品名称',
            dataIndex: 'title'
        }, {
            key: '4',
            title: '商品类目',
            dataIndex: 'categoryName'
        }, {
            key: '5',
            title: '规格',
            dataIndex: 'specOneValue',
            render(val, row) {
                return getSpecValue(row)
            }
        }, {
            key: '6',
            title: '市场价',
            dataIndex: 'marketPrice'
        },{
            key: '7',
            title: '采购价',
            dataIndex: 'purchasePrice'
        },{
            key: '8',
            title: '建议销售价',
            dataIndex: 'advicePrice'
        }, {
            key: '9',
            title: '待同步库存',
            dataIndex: 'incoming',
            render(val,row) {
                let fallback = row.fallback ? row.fallback : 0
                return val - fallback
            }
        }, {
            key: '10',
            title: '状态',
            dataIndex: 'status'
        }];

        return columns;
    }

     getBackColumns() {
        const context = this;
        let columns = [{
            key: '0',
            title: 'SPU编码',
            dataIndex: 'spuId'
        }, {
            key: '1',
            title: 'SKU编码',
            dataIndex: 'skuId'
        }, {
            key: '2',
            title: '所属店铺',
            dataIndex: 'relevantStoreName'
        }, {
            key: '3',
            title: '商品名称',
            dataIndex: 'title'
        }, {
            key: '4',
            title: '待同步库存',
            dataIndex: 'incoming',
            render(val,row) {
                let fallback = row.fallback ? row.fallback : 0
                return val - fallback
            }
        }, {
            key: '5',
            title: '回退数量',
            width: 100,
            dataIndex: 'backStock',
            render(value, row) {
                let {selectItems, curIndex} = context.state;
                return <InputNumber type="text" min={1} max={row.incoming} placeholder="请输入回退数量" style={{ width: 100 }} onChange={(e) => {
                    let items = []
                    selectItems[curIndex].every((val, num) => {
                        if(val.skuId === row.skuId){
                            selectItems[curIndex][num].backStock = e
                            return false
                        }
                        return true
                    })
                    context.setState({
                        selectItems
                    })
                }} />
            }
        }, {
            key: '6',
            title: '操作',
            render(val, row){
                return <a onClick={context.removeItems.bind(context, row) }>删除</a>
            }   
        }];
        return columns;
    }   

     /**
     *  删除时，重新设置源选中数据
     */
    removeItems(curItem){
        const {selectItems, curIndex} = this.state;
        let sourceItems = selectItems[curIndex];
        sourceItems.every((item, index) => {
            if (item.skuId === curItem.skuId) {
                sourceItems.splice(index, 1)
                return false
            }
            return true
        })
        this.setState(this.getItems(selectItems, curIndex))
    }

    getItems(sourceItems, curIndex) {
        const {compareListResult} = this.props
        let selectItemKey = [], resItems = compareListResult.items[curIndex]
        selectItemKey[curIndex] = []
        if (sourceItems[curIndex] && sourceItems[curIndex].length) {
            sourceItems[curIndex].forEach((val) => {
                resItems.items.every((item, index) => {
                    if (item.skuId === val.skuId) {
                        selectItemKey[curIndex].push(index)
                        return false
                    }
                    return true
                })
            })
        }
        return {
            selectItems: sourceItems,
            selectedItemsKeys: selectItemKey
        }
    }

    /**
     * 
     * 导出
     * @param {any} index
     */
    exportHandle(index){
        let {selectItems} = this.state, params = [];
        selectItems[index].forEach(val => {
            params.push({
                recordId : val.recordId,
                skuId : val.skuId
            })
        })
        params = JSON.stringify(params)
        location.href = '/suneee-cloud-ep/api-shopStock.exportWaitingMatchSkus?params='+ params
    }

    /**
     * 
     * 回退
     * @param {any} index
     */
    showBackHandle(index){
        this.setState({
            visible : true,
            curIndex : index
        });
    }

    /**
     * 回退确认
     */
    handleOk() {
        const {tableOptionsPro, compareList} = this.props, context = this;
        let { selectItems,curIndex, remark } = this.state, flag = false;
        let dtoList = selectItems[curIndex].map(val => {
            if(!val.backStock){
                if(!flag) {
                    flag = true
                }
            }
            return {
                recordId : val.recordId,
                skuId : val.skuId,
                incoming : val.backStock
            }
        })
        if(!dtoList.length || flag){
            message.error('回退数量不能为空')
            return
        }
        if(remark==''|| remark == null){
            message.error('回退说明不能为空')
            return
        }
        tableOptionsPro.fallBack({dtoList, remark}).then((res)=>{
            if(res.status === 1){
                // selectItems[curIndex].forEach((val, num)=>{
                //     delete selectItems[curIndex][num].backStock
                // })
                //操作完成后将选中的数据设为空
                selectItems[curIndex] = [];
                context.setState({
                    ...context.getItems(selectItems, curIndex),
                    visible: false,
                    remark : ''
                });
                //重新获取列表数据
                compareList()
            }
        })
    }

    /**
     * 回退取消
     */
    handleCancel() {
        this.setState({
            visible: false,
            remark : ''
        });
    }

    _getStockColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: 'SKU',
            dataIndex: 'title'
        }, {
            key: '1',
            title: '处理结果',
            dataIndex: 'status',
            render(val){
                return val ? '对比更新成功' : '对比失败'
            }
        }, {
            key: '2',
            title: '详细信息',
            dataIndex: 'message'
        }];
        return columns;
    }

    /**
     * 提示信息确认
     */
    handleOkMessage() {
        const context = this;
        const {selectItems, curIndex} = context.state;
        const {compareList} = this.props
        //操作完成后将选中的数据设为空
        selectItems[curIndex] = [];
        context.setState({
            ...context.getItems(selectItems, curIndex),
            resultVisible: false,
            messageDataSource: []
        });
        compareList()
    }

    /**
     * 对比更新
     */
    updateHandle(index){
        const {compareUpt} = this.props.tableOptionsPro;
        const { selectItems } = this.state; 
        
        const context = this;
        let list = selectItems[index] ? selectItems[index].map(val => {
            return {
                recordId: val.recordId,
                skuId: val.skuId
            }
        }) : null
        if(!list){
            message.error('请先选择对比商品')
            return
        }
        compareUpt({list}).then(function(res){
            if (res && res.data) {                
                context.setState({
                    messageDataSource: res.data,
                    resultVisible: true
                })
               
            } else {
                message.error(res.message)
            }

        })
        this.setState({
            curIndex : index
        })
    }

    /**
     * 
     *  勾选元素
     */    
    handleRowSelection(index) {
        let {selectItems} = this.state
        const context = this, {compareListResult} = this.props;
        const {items = []} = compareListResult || {}
        return {
            onSelect(record, selected, selectedRows) {
                context.getSelectedItems(selectItems, selectedRows, items[index], index)
            },
            onSelectAll(selected, selectedRows, changeRows) {
                context.getSelectedItems(selectItems, selectedRows, items[index], index)
            },
        }
    }

    /**
     * 计算选中元素及选中下标
     */
    getSelectedItems(selectItems, selectedRows, sourceItems, index){
        let selectedItemsKeys = []
        selectedItemsKeys[index] = []
        selectItems[index] = selectedRows
        selectedRows.length && selectedRows.forEach((val)=>{
            sourceItems.items && sourceItems.items.every((item, num) => {
                if(val.skuId === item.skuId){
                    selectedItemsKeys[index].push(num)
                    return false
                }
                return true
            })
        })
        
        this.setState({
            selectItems,
            selectedItemsKeys
        })
    }

    /**
     * 
     * 文本框值修改
     */
    changeValue(e){
        this.setState({
            remark : e.target.value
        })
    }

    /**
     * 多个Collapse列表
     */
    getCollapseOptions(tableOptions, val, i, selectItem){
        return {
            tableOptions : {
                ...tableOptions,
                dataSource : val.items,
                rowSelection : this.handleRowSelection(i)    //需要checkbox时填写
            },
            source : {
                key : i,
                titles: [{
                    name: '待对比商品:'+ val.totalWaiting
                }, {
                    name: '比对失败:'+ val.totalFail
                }, {
                    name: '出库时间:'+ val.createTime
                }],
                btns: [{
                    name: '回退',
                    handle : this.showBackHandle.bind(this, i),
                    disabled : selectItem && selectItem.length && this.check('回退') ? false : true,
                }, {
                    name: '导出',
                    handle : this.exportHandle.bind(this, i),
                    disabled : selectItem && selectItem.length && this.check('导出') ? false : true,
                }, {
                    name: '比对更新',
                    handle : this.updateHandle.bind(this, i),
                    disabled : selectItem && selectItem.length && this.check('比对更新') ? false : true,
                }],
                hasArrow: true,
                initFocus : i === 0 ? true : false
            }
        }
    }

    render() {
        const {formOptions, tableOptionsPro, compareListResult} = this.props, context = this;
        const {selectItems, curIndex, visible, resultVisible, messageDataSource, selectedItemsKeys, remark} = this.state
        const {items = [], totalItems = 0} = compareListResult || {}
        const {compareUpt, fallBack, ...other} = tableOptionsPro
        let tableOptions = {
            columns: context._getColumns(),
            ...other
        }
        return (
            <div>{items && items.map((val, i) => {
                   let collapseOptions = context.getCollapseOptions(tableOptions, val, i, selectItems[i])
                    return <Collapse {...collapseOptions.source}>
                        {
                            i === curIndex ? <DataTable bordered={true} {...collapseOptions.tableOptions} selectedItemsKeys={selectedItemsKeys[curIndex]} />:<DataTable bordered={true} {...collapseOptions.tableOptions} />
                        }
                    </Collapse>
                })}
                <Modal title="回退出库"
                    closable={false}
                    visible={visible}
                    width={1000}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <div>
                        <p>回退数量设置</p>
                        <DataTable bordered={true} columns={context.getBackColumns()} dataSource={selectItems[curIndex]} {...other} />
                        <div style={{marginTop:'12px'}}>
                            <span>回退说明</span>
                            <Input type='textarea' onChange={context.changeValue.bind(context)} value={remark} />
                        </div>
                    </div>
                </Modal>
                <Modal title="处理结果" visible={resultVisible} onOk={this.handleOkMessage} onCancel={this.handleOkMessage}>
                    <div className="modalResult">
                        <DataTable columns={this._getStockColumns()} size='small' dataSource={messageDataSource} />
                    </div>
                </Modal>
            </div>
        )
    }
}


product.propTypes = {
    dataSource : React.PropTypes.array
}


export default product;
