import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import { Radio } from 'hen';
import Search from 'components/Search';

class TableRadio extends Component {

    constructor(props){
        super(props)
        this.state = {
            items : props.selectItem
        }
    }

    _getColumns(){
        const {tableOptions} = this.props, context = this;
        const {dataSource, columns} = tableOptions;
        let addColumns = {
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
        };
        columns.unshift(addColumns)
        return columns;
    }
    

    render() {
        let {tableOptions, uKey } = this.props;
        let {dataSource, ...other} = tableOptions;
        let {items} = this.state;
        //再次选者spu时，先记录之前的spu值
        if(dataSource && items){
            dataSource.every((val,index)=>{
                if(val[uKey] == items[uKey]){
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
        return <DataTable bordered={true} size='small' columns={this._getColumns()} {...tableOptions} />
    }
}


TableRadio.propTypes = {

    // dataSource : React.PropTypes.array.isRequired,
    // action : React.PropTypes.func.isRequired,

    // loading : React.PropTypes.bool,
    // params : React.PropTypes.object
}


export default TableRadio;
