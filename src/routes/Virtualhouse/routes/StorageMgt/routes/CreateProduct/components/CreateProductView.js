import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Row, Col, Button, Modal} from 'hen';
import Sku from "./Sku"
import SearchSpu from "./SearchSpu"
import Form from 'components/Form';


class CreateProduct extends Component {
    constructor(props){
        super(props);

        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.state = {
            visible : false,
            selectItem : null
        }
    }

    _getFormItems() {
        let config = {}, context = this;
        const {cateList, brandList, getSpecByCateList, specListResult} = this.props;
        const { selectItem } = this.state;

	    config.formItems = [{
                label: "SPU：",
                name: "spuId",
                disabled: 'disabled',
                custom(getCustomFieldProps) {
                    return <Row>
                        <Col span='12'><input type="text" className="ant-input ant-input-lg" {...getCustomFieldProps('spuId') } /></Col><Col span='6'><Button onClick={context.showModal}>选择已有SPU</Button></Col>
                    </Row>
                }
            }, {
                label: "商品标题：",
                name: "title",
                required: true,
                input: {
                    placeholder: "请输入商品标题",
                    disabled: selectItem ? true : false
                }
            }, {
                label: "商品类目：",
                name: "categoryCode",
                wrapperCol: {span: 15},
                cascader: {
                    options: cateList,
                    placeholder: "请选择所属类目",
                    disabled: selectItem ? true : false
                },
                fieldOptions: {
                    onChange:function(value) {
                        getSpecByCateList({categoryCode: value.pop()})
                    }
                }
            }, {
                label: "商品品牌：",
                name: "brandId",
                select: {
                    placeholder: "请选择商品品牌",
                    optionValue: brandList,
                    disabled: selectItem ? true : false
                }
            }, {
                label: "市场价(元)：",
                name: "marketPrice",
                infoLabel: <span>价格必须是0.01～9999999之间数字</span>,
                input: {
                    placeholder: "请输入市场价",
                    disabled: selectItem ? true : false
                }
            }, {
                label: "销售价(元)：",
                name: "price",
                required: true,
                infoLabel: <span>价格必须是0.01～9999999之间数字，不能大于市场价</span>,
                input: {
                    placeholder: "请输入销售价",
                    disabled:true
                }
            }, {
                label: "库存数量：",
                name: "stock",
                required: true,
                infoLabel: <span>必须是0～999999999之间整数</span>,
                input: {
                    placeholder: "请输入库存数量",
                    disabled:true
                }
            }, {
                label: "商品规格：",
                required: true,
                wrapperCol: {span: 15},
                custom() {
                    return <Sku sourceData={specListResult} specState={selectItem} ></Sku>
                }
            }];
        config.initValue = {
            spuId: null,
            title: null,
            categoryCode: null,
            brandId: null,
            marketPrice: null,
            price: null,
            stock: null
        }
        if(selectItem){
            config.initValue = selectItem;
        }

        return config;
    }

    showModal() {
        const {tableOptions} = this.props;
        const {action, pagination} = tableOptions
        this.setState({
            visible: true
        });
        action({pageNumber : pagination.current})
    }

    handleOk() {
        //selectItem获取选中spu数据
        const searchSpuState = this.refs.searchList
        let selectItem = null;
        if(searchSpuState.state){
            selectItem = searchSpuState.state.items
        }
        this.setState({
            visible: false,
            selectItem
        });
    }

    handleCancel(e) {
        this.setState({
            visible: false
        });
    }
    
    render() {
        let {formOptions, tableFormOptions, tableOptions} = this.props;
        const {selectItem} = this.state;
        return (
            <div>
                <Form horizontal  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />
                <Modal visible={this.state.visible}
                    closable={false}
                    width={1020}
                    onOk={this.handleOk} onCancel={this.handleCancel}>
                    <SearchSpu tableFormOptions={tableFormOptions} tableOptions={tableOptions} selectItem={selectItem} ref='searchList'></SearchSpu>
                </Modal>
            </div>
        )
    }
}


CreateProduct.propTypes = {

    loading: React.PropTypes.bool,
    params: React.PropTypes.object
}


export default CreateProduct;
