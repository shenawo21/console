import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import LogisticsView from '../components/LogisticsView'
import Panel from 'components/Panel'
import {queryList, setDefault} from '../modules/LogisticsReducer'

class Logistics extends Component {
  
    constructor(props) {
        super(props);

        this.state = {
            params: {}   //表格需要的筛选参数
        }
    }
    
    componentDidMount() {
        const {queryList, location} = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        queryList({ pageNumber });
    }
    
    render() {
        const {params} = this.state;
        
        const {items, queryList, totalItems, loading, setDefault} = this.props;
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : queryList,                         //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems                      //数据总数
            },  
            loading,                                    //表格加载数据状态
            params                                     //表格检索数据参数
        }
        
        return <Panel title=""><LogisticsView tableOptions={tableOptions} setDefault={setDefault} /></Panel>
    }
}


Logistics.propTypes = {
    queryList: React.PropTypes.func,
    items: React.PropTypes.array.isRequired,
    totalItems: React.PropTypes.number.isRequired,
    setDefault: React.PropTypes.func,
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    queryList,
    setDefault,
}


const mapStateToProps = (state) => {
    const {result, loading, defaultResult} = state.logistics;
    
    const {items = [], totalItems = 0} = result || {};
    return { items, totalItems, loading };
}

export default connect(mapStateToProps, mapActionCreators)(Logistics)

