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
                        if(val.spuId == row.spuId){
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
            dataIndex: 'spuId'
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
            dataIndex: 'marketPrice'
        },{
            key: '5',
            title: '商品库存',
            dataIndex: 'total'
        }];
        return columns;
    }
    

    render() {
        let {tableOptions} = this.props;

        let {dataSource, ...other} = tableOptions;
        let {items} = this.state;
        //再次选者spu时，先记录之前的spu值
        if(dataSource && items){
            dataSource.every((val,index)=>{
                if(val.spuId == items.spuId){
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
