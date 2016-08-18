
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import OutgoMgtView from '../components/OutgoMgtView'
import Panel from 'components/Panel'
import { getVirList, storeManage, getShopList } from '../modules/OutgoMgtReducer'

import {message} from 'hen';

class OutgoMgt extends Component {

    constructor(props) {
        super(props);

        this.getFormOptions = this.getFormOptions.bind(this);

        this.state = {
            item: {},
            params: {},
            pageSize: 5,
            shopList: []
        };  //定义初始状态
    }

    //获取分页页码
    getPageNumber(location) {
        const {query} = location;
        return query && query.p ? Number(query.p) : 1;
    }

    componentDidMount() {
        const { getVirList, getShopList, location } = this.props;
        const {pageSize} = this.state;
        let pageNumber = this.getPageNumber(location);
        getVirList({ pageNumber, pageSize });

        getShopList().then(res => {
            const lists = res.data;
            this.setState({
                shopList: lists
            });
        })

    }

    componentWillReceiveProps(nextProps, preProps){
        if(nextProps.jump){
            setTimeout(()=>{
                this.context.router.push('/virtualhouse')
            },600)
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
            const { storeManage } = context.props;

            // storeManage({
            //     recordType: '2',                
            //     operateStore: '1',
            //     remark: 'dsf',  
            //     stockDetailList: [{skuId:'1',price:'2',incoming:'2'}]  
            // });

            // this.props.form.validateFieldsAndScroll((errors, values) => {
            //     if (!!errors) {
            //         console.log('Errors in form!!!');
            //         return;
            //     }
            //     console.log('Submit!!!');
            //     console.log(values);
            // });

          },

          /**
           * (重置)表单
           */

          handleReset(){

          }

        }
    }

    render() {
        const {item, params, selectedItems, shopList, pageSize} = this.state;
        const {items, getVirList, totalItems, loading, location} = this.props;

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
       
        const formOptions = {
            ...this.getFormOptions()
        }

        return <Panel title="出库管理"><OutgoMgtView item={item} tableOptions={tableOptions} formOptions={formOptions} shopList={shopList} /></Panel>
    }
}

//数据限制类型
OutgoMgt.propTypes = {
    getVirList: React.PropTypes.func,
    storeManage: React.PropTypes.func,
    getShopList: React.PropTypes.func,
    loading: React.PropTypes.bool,
    result: React.PropTypes.object,
}

const mapActionCreators = {
    getVirList,
    storeManage,
    getShopList
}

const mapStateToProps = (state) => {

    const {result, virListResult, shopListResult, loading} = state.outgoMgt;

    const {items = [], totalItems = 0} = virListResult || {};

    return {items, totalItems, 'shopListResult': shopListResult, 'result': result, loading};

}
export default connect(mapStateToProps, mapActionCreators)(OutgoMgt)
