import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import OutgoMgtView from '../components/OutgoMgtView'
import Panel from 'components/Panel'
import { getVirList, storeManage, getShopList, outCateList } from '../modules/OutgoMgtReducer'

class OutgoMgt extends Component {

    constructor(props) {
        super(props);

        this.getFormOptions = this.getFormOptions.bind(this);

        this.state = {
            params: {},  //表格需要的筛选参数
            pageSize: 5
        };  //定义初始状态
    }

    /**
     * 获取分页页码
     * @params location
     */
    getPageNumber(location) {
        const {query} = location;
        return query && query.p ? Number(query.p) : 1;
    }

    componentDidMount() {
        const { getVirList, getShopList, outCateList, location } = this.props;
        const {pageSize} = this.state;
        let pageNumber = this.getPageNumber(location);
        getVirList({ pageNumber, pageSize });
	    //获取店铺列表
        getShopList();

        //获取分类列表
        outCateList();

    }

    componentWillReceiveProps(nextProps, preProps){
        if(nextProps.jump){
            setTimeout(()=>{
                this.context.router.push('/virtualhouse')
            },100)
        }
    }  

    /**
   * handle submit
   * @param  {any} formData
   * @param  {any} e
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
                value.categoryCode = value.categoryCode && value.categoryCode[value.categoryCode.length - 1] || '';
                context.setState({
                    params: {pageSize, ...value}
                })

            },

          /**
           * (重置)表单
           */

          handleReset(){

          }

        }
    }

    render() {
        const {params, selectedItems, pageSize} = this.state;
        const {items, getVirList, totalItems, cateResult, shopListResult, storeManage, loading, location} = this.props;
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

        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : getVirList,                         //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems,                     //数据总数
                pageSize,
                current : this.getPageNumber(location)
            },
            loading,                                    //表格加载数据状态
            params                                      //表格检索数据参数
        }
	
	/**
     * 店铺列表
     * @param lists
     * @returns {*}
     */
	const shopLoop = (lists) => {
            return lists && lists.map(a => {
                return {
                    value: a.shopId,
                    title: a.name,
                    disabled: (a.status != 'use' || a.enabled == false) ? true : false
                }
            })
        }
       
        const formOptions = {
            ...this.getFormOptions()
        }

        return <Panel title="出库管理"><OutgoMgtView tableOptions={tableOptions} formOptions={formOptions} shopList={shopLoop(shopListResult)} cateList={loop(cateResult)} storeManage={storeManage} /></Panel>
    }
}

//数据限制类型
OutgoMgt.propTypes = {
    getVirList: React.PropTypes.func,
    storeManage: React.PropTypes.func,
    getShopList: React.PropTypes.func,
    outCateList: React.PropTypes.func,
    loading: React.PropTypes.bool,
    result: React.PropTypes.object,
}

const mapActionCreators = {
    getVirList,
    storeManage,
    getShopList,
    outCateList
}


OutgoMgt.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {

    const {result, virListResult, shopListResult, cateResult, loading, jump} = state.outgoMgt;
    const {items = [], totalItems = 0} = virListResult || {};

    return {items, totalItems, shopListResult, cateResult, result, loading, jump};

}
export default connect(mapStateToProps, mapActionCreators)(OutgoMgt)
