import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import AdjustStockView from '../components/AdjustStockView'
import Panel from 'components/Panel'
import {adjustStock, getAirList, adStockCateList} from '../modules/AdjustStockReducer'

class AdjustStock extends Component {

    constructor(props) {
        super(props);

        this.getFormOptions = this.getFormOptions.bind(this);

        this.state = {
            params: {},  //表格需要的筛选参数
            pageSize: 5
        };  //定义初始状态
    }

    //获取分页页码
    getPageNumber(location) {
        const {query} = location;
        return query && query.p ? Number(query.p) : 1;
    }

    componentDidMount() {
        const {getAirList, adStockCateList, location} = this.props;
        const {pageSize} = this.state;
        let pageNumber = this.getPageNumber(location);
        getAirList({ pageNumber, pageSize });

        //获取分类列表
        adStockCateList();

    }

    /**
     * (表格功能配置项)
     * 
     * @returns (description)
     */
    getFormOptions() {
        const context = this;
        const {pageSize} = this.state;
        return {
            /**
             * (表单提交)
             * 
             * @param value (description)
             */
            handleSubmit(value) {
		if(value.categoryCode){ value.categoryCode = value.categoryCode[value.categoryCode.length - 1]}
                context.setState({
                    params: { pageSize, ...value}
                })
            }
        }
    }   
    
    
    render() {
        const { params, pageSize} = this.state;

        const {items, getAirList, adjustStock, cateResult, totalItems, loading, location} = this.props;



        const tableOptions = {
            dataSource: items,                         //加载组件时，表格从容器里获取初始值
            action: getAirList,                         //表格翻页时触发的action
            pagination: {                              //表格页码陪着，如果为false，则不展示页码
                total: totalItems,                      //数据总数
                pageSize,
                current: this.getPageNumber(location)
            },
            loading,                                    //表格加载数据状态
            params                                      //表格检索数据参数
        }
        /**
         * 类目列表
         * @param lists
         * @returns {*}
         */
        const loop = (lists) => {
            return lists && lists.map(a => {
                let children = a.level < 3 ? loop(a.children) : '';

                if (children) {
                    return {
                        value: a.categoryCode + '',
                        label: a.name,
                        children
                    }
                } else {
                    return {
                        value: a.categoryCode + '',
                        label: a.name
                    }
                }
            })
        }
        const formOptions = {
                ...this.getFormOptions()
        }

        return <Panel title="库存调整"><AdjustStockView tableOptions={tableOptions} formOptions={formOptions} cateList={loop(cateResult) } adjustStock={adjustStock} /></Panel>
    }
}


AdjustStock.propTypes = {
    adjustStock: React.PropTypes.func,
    getAirList: React.PropTypes.func,
    adStockCateList: React.PropTypes.func,
    loading: React.PropTypes.bool,
    result: React.PropTypes.object,
}

const mapActionCreators = {
    adjustStock,
    getAirList,
    adStockCateList
}

const mapStateToProps = (state) => {
    const {result, airListResult, cateResult, loading} = state.adjustStock;

    const {items = [], totalItems = 0} = airListResult || {};
    return { items, totalItems, cateResult, result, loading };

}

export default connect(mapStateToProps, mapActionCreators)(AdjustStock)

