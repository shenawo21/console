import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import { message } from 'hen';
import Usercomponent from '../components/Addressmanage'
import Panel from 'components/Panel'
import {gitAddressList, delAddress,addAddress,editAddress,setDefault,getShopList,list,gitAddressItem} from '../modules/addressmanage'

class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {
            params: {},   //表格需要的筛选参数
            selectedRowKeys: [],
            selectedRowId: [], //选中的id
            visible: false,
            addressItemState : {},
            id:''
        }
        this.onSelectChange = this.onSelectChange.bind(this);
        this.handleDels = this.handleDels.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.Edit = this.Edit.bind(this)
        this.setDefault = this.setDefault.bind(this)
    }
    componentDidMount() {
        const {gitAddressList, getShopList,list, location} = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        gitAddressList({pageNumber});
        //获取店铺列表
        getShopList();
        // 获取地址列表
        list()
    }
    getFormOptions() {
        const context = this;
        return {
            handleSubmit(value) {
                context.setState({
                    params: value
                })
            },
            showModal(formObj){
                formObj && formObj.resetFields()
                context.setState({
                    visible: true,
                    id:'',
                    addressItemState : {}
                })
            },
            handleCancel() {
                context.setState({
                    visible: false,
                });
            }
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.addressItem){
            this.setState({
                addressItemState: nextProps.addressItem
            })
        }
         
    }

    handleDels(data,cb){
        const context = this;
        const {delAddress} = this.props;
        delAddress({...data}).then(function(res) {
            cb()
            context.setState({selectedRowKeys:[]})
        });
    }
    // 获取单条地址信息
    Edit(id) {
        const context = this;
        const {gitAddressItem} = this.props
        gitAddressItem({id:id}).then(function(res) {
            context.setState({
                visible: true,
                id:id
            })
        })        
    }
    handleOk (values,fresh) {
        const self = this
        const {id} = this.state
        const {addAddress,editAddress,gitAddressList} = this.props
        const addArray = values.address
        values.receiverState = addArray[0] ? addArray[0] : ''
        values.receiverCity = addArray[1] ? addArray[1] : ''
        values.receiverDistrict = addArray[2] ? addArray[2] : ''
        delete values.address
        if (id) {
            values = {...values,id:id}
            editAddress(values).then(function(res) {
                if (res && res.status == 1) {
                    self.setState({visible: false})
                    fresh && fresh.resetFields()
                    gitAddressList()
                } else {
                    message.error(res.message, 1)
                }
                
           })
        } else {
            addAddress(values).then(function(res) {
                if (res && res.status == 1) {
                    self.setState({visible: false})
                    fresh && fresh.resetFields()
                    gitAddressList()
                } else {
                    message.error(res.message, 1)
                }    
           })
        }
    }
    // 设为默认地址
    setDefault(id,shopId,refresh) {
        const {setDefault,gitAddressList} = this.props
        setDefault({id:id,shopId:shopId})
        refresh()
    }
    //改变select选项回调
    onSelectChange(selectedRowKeys, selectedRows) {
        const selectedRowId = selectedRows.map(c => c.id);
        this.setState({ selectedRowId: selectedRowId})
        this.setState({ selectedRowKeys });
    }
    
    render() {
        const self = this
        const {items,totalItems,shoplist,loading, gitAddressList,addresslist } = this.props;
        const {params, visible, selectedRowKeys, selectedRowId, addressItemState} = this.state;
        const tableOptions = {
            dataSource: items,                         //加载组件时，表格从容器里获取初始值
            action: gitAddressList,                     //表格翻页时触发的action
            loading,                                     //表格加载数据状态
            params,                                     //表格检索数据参数
            pagination: {                              //表格页码陪着，如果为false，则不展示页码
                total: totalItems                      //数据总数
            },
            selectedRowKeys,
            selectedRowId
        }
        /**
         * 店铺列表
         */
        let shopListItem = [];
        if (shoplist) {
            shopListItem = shoplist.map(c=> {
            return {
                value: c.shopId,
                title: c.name
           }
        });
        } else {
            shopListItem = [{
                value: null,
                title: '正在加载中...'
            }]
        }
        return <Panel>
            <Usercomponent
                {...tableOptions}
                visible = {visible}
                addresslist = {addresslist}
                shopListItem={shopListItem}
                onSelectChange={this.onSelectChange}
                formOptions={this.getFormOptions()}
                handleOk = {this.handleOk}
                Edit = {this.Edit}
                setDefault = {this.setDefault}
                addressItem = {addressItemState}
                handleDels={this.handleDels}>
            </Usercomponent>
        </Panel>
    }
}

const mapActionCreators = {
    gitAddressList, 
    delAddress,
    addAddress,
    editAddress,
    setDefault,
    getShopList,
    list,
    gitAddressItem
}

const mapStateToProps = (state) => {
    const {result,addresslist = [], shoplist,addressItem,loading} = state.addressmanage;
    const {items = [], totalItems = 0} = result || {};
    return {
          items, 
          totalItems,
          addresslist,
          shoplist,
          addressItem,
          loading
    }
}

export default connect(mapStateToProps, mapActionCreators)(Container)