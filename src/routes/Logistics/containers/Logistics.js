import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import LogisticsView from '../components/LogisticsView'
import Panel from 'components/Panel'
import {queryList, isDefault} from '../modules/LogisticsReducer'

class Logistics extends Component {
  
    constructor(props) {
        super(props);
        this.state = {}
    }
    //设为默认
    _isDefault(id){
        const { isDefault } = this.props;
        isDefault({configId: id});
    }
    
    componentDidMount() {
        const {queryList} = this.props;
        queryList();
    }

    render() {
        const {params} = this.state;
        const {items, queryList, totalItems, loading} = this.props;
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            loading,                                    //表格加载数据状态
            isDefault: this._isDefault.bind(this)
        }
        return <Panel title=""><LogisticsView tableOptions={tableOptions} /></Panel>
    }
}


Logistics.propTypes = {
    queryList: React.PropTypes.func,
    isDefault: React.PropTypes.func,
    items: React.PropTypes.array.isRequired,
    totalItems: React.PropTypes.number.isRequired,
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    add,
    deleteItem,
    queryList,
    isDefault
}

const mapStateToProps = (state) => {
    const {result, loading} = state.logistics;
    const {items = [], totalItems = 0} = result || {};
    return { items, totalItems, loading };
    
}

export default connect(mapStateToProps, mapActionCreators)(Logistics)

