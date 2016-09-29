import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import { DatePicker, Col, Radio } from 'hen';
import Search from 'components/Search';

class SearchSpu extends Component {

    constructor(props){
        super(props)
        this.state = {
            items : props.selectItem
        }
    }
    _getFormItems(){
        let config = {
            formItems: [{
                label: "skuId：",
                name: "skuId",
                span: '8',
                input: {
                    type: 'number',                
                    placeholder: "请输入skuId",
                    type: 'number'
                }
            },  {
                label: "商品标题：",
                name: "title",
                span: '8',
                input: {
                    placeholder: "请输入商品标题"
                }
            }],
            initValue: {
                skuId: null,
                title: null
            }
        }
        return config;
    }
    _getColumns(){
        const {tableOptions} = this.props, context = this;
        const {dataSource} = tableOptions;
        let columns = [{
            key: '0',
            title: '操作',
            width : 50,
            dataIndex : 'isChecked',
            render(val, row){
                return <Radio onChange={(e)=>{
                    dataSource.forEach((val, index)=>{
                        if(val.skuId == row.skuId){
                            dataSource[index].isChecked = e.target.checked
                        }else{
                            dataSource[index].isChecked = false
                        }
                    })
                    context.setState({
                        items : e.target.checked ? row : '',
                        tableOptions : {
                            dataSource
                        }
                    })
                }} checked={val ? true : false}></Radio>
            }
        },{
            key: '1',
            title: '商品编码',
            dataIndex: 'skuId'
        }, {
            key: '2',
            title: '商品标题',
            dataIndex: 'title'
        }, {
            key: '3',
            title: '创建日期',
            dataIndex: 'createTime'
        },{
            key: '4',
            title: '商品价格',
            dataIndex: 'price'
        },{
            key: '5',
            title: '商品库存',
            dataIndex: 'stock'
        }];
        return columns;
    }
    

    render() {
        let {tableFormOptions,tableOptions} = this.props;

        let {dataSource, ...other} = tableOptions;
        let {items} = this.state;
        //再次选者spu时，先记录之前的spu值
        if(dataSource && items){
            dataSource.every((val,index)=>{
                if(val.skuId == items.skuId){
                    dataSource[index].isChecked = true
                    return false
                }
                return true
            })
            tableOptions = {
                dataSource,
                ...other
            }
        }
        return (
            <div>
                <Search  items={this._getFormItems()}  onSubmit={tableFormOptions.handleSubmit} onReset={tableFormOptions.handleReset}/>
                <DataTable bordered={true} size='small' columns={this._getColumns()} {...tableOptions} />
            </div>
        )
    }
}


SearchSpu.propTypes = {

    // dataSource : React.PropTypes.array.isRequired,
    // action : React.PropTypes.func.isRequired,

    loading : React.PropTypes.bool,
    params : React.PropTypes.object
}


export default SearchSpu;
